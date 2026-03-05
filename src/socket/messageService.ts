import { store } from "@/store";
import { SocketClient } from "./socketClient";
import { sendHeartbeat } from "./singalEmitter";
import { authService } from "@/api";
import { AT_EXPIRE } from "@/constants";
import {
  insertMessages,
  clearAuthData,
  Message,
  updateSyncUserMsgSeqNum,
  ReadReceipt,
  updateMessagesReadStatus,
} from "@/features";
import { url } from "./events";

import { syncOfflineMessages } from "./SyncService";

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

  public forceLogout() {
    this.stopHeartbeat();
    SocketClient.getInstance().disconnect();
    store.dispatch(clearAuthData());
  }

  public async handleHeartbeatAck(LatestSyncUserMsgSeqNum: number) {
    try {
      const { chat } = store.getState();

      const isSyncChatMessage = LatestSyncUserMsgSeqNum > chat.syncUserMsgSeqNum || LatestSyncUserMsgSeqNum > 0;

      if (isSyncChatMessage) {
        await syncOfflineMessages(chat.syncUserMsgSeqNum);
      }
    } catch (e: unknown) {
      console.error(e);
      this.isSyncing = false;
    }
  }

  public handleIncomingMessages(messages: Message[]) {
    store.dispatch(insertMessages(messages));
  }

  public handleUpdateSyncUserChatMessageNum(SyncUserChatMessageNum: number) {
    store.dispatch(updateSyncUserMsgSeqNum(SyncUserChatMessageNum));
  }
  public handleupdateMessagesReadStatus(data: ReadReceipt) {
    store.dispatch(updateMessagesReadStatus(data));
  }
}
