import { SocketManager } from "./manager";
import { store } from "@/store";
import { EVENT, MESSAGE_STATUS } from "@/constants";
import { SendMessage, ChatMessage, SuccessChatMessage } from "./types";

// 发送心跳包
export function sendHeartbeat() {
  const socket = SocketManager.getInstance().socket;
  if (socket?.connected) {
    socket.timeout(5000).emit(EVENT.SYSTEM.HEARTBEAT, (err: unknown, LatestSyncUserMsgSeqNum: number) => {
      const state = store.getState();
      const isSync = LatestSyncUserMsgSeqNum > state.chat.syncUserMsgSeqNum;

      if (!err && isSync) {
        sendSyncMessage(state.chat.syncUserMsgSeqNum);
      }
    });
  }
}

// 发送私聊消息
export function sendMessage(data: SendMessage): Promise<ChatMessage> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({
        chatId: data.toId,
        id: data.clientMsgId,
        status: MESSAGE_STATUS.FAILED,
        timestamp: Date.now(),
      });
      return;
    }
    socket.timeout(5000).emit(EVENT.CHAT.SEND_MESSAGE, data, (err: unknown, result: SuccessChatMessage) => {
      if (err) {
        resolve({
          chatId: data.toId,
          id: data.clientMsgId,
          status: MESSAGE_STATUS.FAILED,
          timestamp: Date.now(),
        });
      }
      resolve(result);
    });
  });
}

// 发送已读回执
export function sendReadReport(fromId: string, lastSessionSeqNum: number) {
  const socket = SocketManager.getInstance().socket;

  if (socket?.connected) {
    socket.emit(EVENT.CHAT.READ_REPORT, { fromId, lastSessionSeqNum });
  }
}

// 拉取离线消息
export function sendSyncMessage(syncUserMsgSeqNum: number) {
  const socket = SocketManager.getInstance().socket;

  if (socket?.connected) {
    socket.emit(EVENT.CHAT.SYNC_OFFINE_MESSAGES, syncUserMsgSeqNum);
  }
}
