import { store } from "@/store";
import { io, Socket } from "socket.io-client";
import { setupSocketListeners } from "./listeners";
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
    const URL = "https://zerochat.top";
    const token = store.getState().auth.token;

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

    this.socket = io(URL, {
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
    this.socket.on("connect_error", () => {
      this.setStatus(false);
      this.stopHeartbeat();
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
