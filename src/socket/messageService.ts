import { store } from "@/store";
import { SocketClient } from "./socketClient";
import { sendHeartbeat } from "./emitter";
import { authService } from "@/api";
import { AT_EXPIRE } from "@/constants";
import { clearAuthData } from "@/features";
import { url } from "./events";

export class MessageService {
  private static instance: MessageService;
  public isSyncing = false;
  private heartbeatTimer: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance() {
    if (!MessageService.instance) MessageService.instance = new MessageService();
    return MessageService.instance;
  }

  public startHeartbeat() {
    this.stopHeartbeat();
    const tick = () => {
      sendHeartbeat();
    };
    tick();
    this.heartbeatTimer = setInterval(tick, 5000);
  }

  public stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    this.heartbeatTimer = null;
    this.isSyncing = false;
  }
  public async handleConnectError(err: Error) {
    if (err.message === AT_EXPIRE) {
      try {
        await authService.refreshToken(AT_EXPIRE);
        const newToken = store.getState().auth.accessToken;
        if (newToken) {
          SocketClient.getInstance().connect(newToken, url);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }
  public async handleHeartbeatAck() {
    console.log("我在这时执行心跳");
  }

  public forceLogout() {
    this.stopHeartbeat();
    SocketClient.getInstance().disconnect();
    store.dispatch(clearAuthData());
  }
}
