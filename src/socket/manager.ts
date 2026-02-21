import { store } from "@/store";
import { url } from "@/constants";
import { io, Socket } from "socket.io-client";
import { setupSocketListeners } from "./listeners";
import { authService } from "@/api";
import { AT_EXPIRE } from "@/constants";
type SocketType = Socket | null;

export class SocketManager {
  private static instance: SocketManager;
  public socket: SocketType = null;
  public isConnected: boolean = false;
  private currentToken: string | null = null;
  private onStatusChange: ((status: boolean) => void) | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private constructor() {}

  public static getInstance() {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }
  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit("client_heartbeat");
      }
    }, 20000);
  }
  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  public subscribeStatus(callback: ((status: boolean) => void) | null) {
    this.onStatusChange = callback;
  }
  private setStatus(status: boolean) {
    this.isConnected = status;
    this.onStatusChange?.(status);
  }

  public connect() {
    const token = store.getState().auth.accessToken;

    if (!token) {
      return;
    }
    if (this.socket) {
      if (this.currentToken === token) {
        if (this.socket.connected) {
          return;
        }
        this.socket.connect();
        return;
      }
      this.disconnect();
    }

    this.currentToken = token;

    this.socket = io(url, {
      auth: { token: token },
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    this.socket.removeAllListeners();

    this.socket.on("connect", () => {
      this.setStatus(true);
      this.startHeartbeat();
    });
    this.socket.on("disconnect", () => {
      this.setStatus(false);
      this.stopHeartbeat();
    });

    this.socket.on("connect_error", async (err: Error) => {
      this.setStatus(false);
      this.stopHeartbeat();

      if (err.message === AT_EXPIRE) {
        try {
          await authService.refreshToken("at_expire");

          this.disconnect();
          this.connect();
        } catch (error: unknown) {
          console.error("Token 换票失败，无法自动恢复连接", error);
        }
      } else {
        console.error("Socket 连接错误:", err.message);
      }
    });

    setupSocketListeners(this.socket);
    this.socket.connect();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.stopHeartbeat();
      this.socket.disconnect();
      this.socket = null;
    }
    this.currentToken = null;
    this.setStatus(false);
  }
}
