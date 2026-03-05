import { store } from "@/store";
import { SocketClient } from "./socketClient";
import { sendHeartbeat, removeReadOfflineMessages } from "./singalEmitter";
import { authService } from "@/api";
import { AT_EXPIRE } from "@/constants";
import {
  insertMessages,
  clearAuthData,
  Message,
  updateSyncUserMsgSeqNum,
  ReadReceipt,
  updateMessagesReadStatus,
  getOffineChatMessages,
} from "@/features";
import { url } from "./events";
import { getErrorMessage } from "@/utils";
import { Toast } from "@/components";

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
      if (!this.isSyncing && SocketClient.getInstance().isConnected) {
        sendHeartbeat();
      }
    };
    tick();
    this.heartbeatTimer = setInterval(tick, 20000);
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

  public forceLogout() {
    this.stopHeartbeat();
    SocketClient.getInstance().disconnect();
    store.dispatch(clearAuthData());
  }

  public async handleHeartbeatAck(LatestSyncUserMsgSeqNum: number) {
    try {
      const state = store.getState();
      const currentUserMsgSeqNum = state.chat.syncUserMsgSeqNum;

      const isSync = LatestSyncUserMsgSeqNum > currentUserMsgSeqNum || LatestSyncUserMsgSeqNum > 0;
      console.log(LatestSyncUserMsgSeqNum, currentUserMsgSeqNum);
      if (isSync) {
        this.isSyncing = true;
        const messages: Message[] = await getOffineChatMessages(currentUserMsgSeqNum);

        if (messages && messages.length > 0) {
          this.handleIncomingMessages(messages);
          removeReadOfflineMessages(messages[messages.length - 1]);
        }
      }
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      Toast.error(message);
    }
  }

  public handleIncomingMessages(messages: Message[], isSync = false) {
    store.dispatch(insertMessages(messages));

    if (isSync) {
      this.isSyncing = false;
    }
  }

  public handleUpdateSyncUserChatMessageNum(SyncUserChatMessageNum: number) {
    store.dispatch(updateSyncUserMsgSeqNum(SyncUserChatMessageNum));
  }
  public handleupdateMessagesReadStatus(data: ReadReceipt) {
    store.dispatch(updateMessagesReadStatus(data));
  }
}
