import { SocketManager } from "./manager";

import { EVENT, MESSAGE_STATUS } from "@/constants";
import { SendMessage, ChatMessage, SuccessChatMessage } from "./types";

// 发送心跳包
export function sendHeartbeat() {
  const socket = SocketManager.getInstance().socket;
  if (socket?.connected) {
    socket.emit(EVENT.SYSTEM.HEARTBEAT);
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
