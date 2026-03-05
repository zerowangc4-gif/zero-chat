import { io, Socket } from "socket.io-client";
import { setupSocketListeners } from "./listener";
import { MessageService } from "./messageService";

export class SocketClient {
  private static instance: SocketClient;
  public socket: Socket | null = null;
  public isConnected = false;
  private currentToken: string | null = null;
  private onStatusChange: ((status: boolean) => void) | null = null;

  private constructor() {}

  public static getInstance() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(token: string, url: string) {
    if (!token) {
      return;
    }

    if (this.socket && this.currentToken === token) {
      if (!this.socket.connected) {
        this.socket.connect();
      } else {
        return;
      }
    }

    this.disconnect();
    this.currentToken = token;

    this.socket = io(url, {
      auth: { token },
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => this.setStatus(true));

    this.socket.on("disconnect", () => this.setStatus(false));

    this.socket.on("connect_error", err => {
      MessageService.getInstance().handleConnectError(err);
    });

    setupSocketListeners(this.socket);

    this.socket.connect();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.currentToken = null;
    this.setStatus(false);
  }

  public subscribeStatus(callback: ((status: boolean) => void) | null) {
    this.onStatusChange = callback;
  }

  private setStatus(status: boolean) {
    this.isConnected = status;
    this.onStatusChange?.(status);
  }
}
