import { store } from "@/store";
import { SocketClient } from "./socketClient";
import { authService } from "@/api";
import { AT_EXPIRE } from "@/constants";
import { setTokens } from "@/features";
import { url } from "./events";

export class MessageService {
  private static instance: MessageService;

  private constructor() {}

  public static getInstance() {
    if (!MessageService.instance) MessageService.instance = new MessageService();
    return MessageService.instance;
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

  public forceLogout() {
    SocketClient.getInstance().disconnect();
    store.dispatch(
      setTokens({
        accessToken: "",
        refreshToken: "",
      }),
    );
  }
}
