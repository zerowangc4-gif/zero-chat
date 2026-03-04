import { SocketClient } from "./SocketClient";
import { MessageService } from "./MessageService";
import { MESSAGE_STATUS } from "@/constants";
import { Message } from "@/features/chat";
import { EVENT } from "./events";

const getSocket = () => {
  return SocketClient.getInstance().socket;
};

const getMessageService = () => {
  return MessageService.getInstance();
};

// 发送心跳包
export function sendHeartbeat() {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.timeout(5000).emit(EVENT.system.heartBeat, (err: unknown, LatestSyncUserMsgSeqNum: number) => {
    const messageService = getMessageService();
    if (!err) {
      messageService.handleHeartbeatAck(LatestSyncUserMsgSeqNum);
    }
  });
}

// 发送信息
export function sendMessage(data: Message): Promise<Message> {
  return new Promise(resolve => {
    const socket = getSocket();
    if (!socket || !socket.connected) {
      resolve({
        ...data,
        status: MESSAGE_STATUS.FAILED,
      });
      return;
    }
    socket.timeout(5000).emit(EVENT.chat.chatMessage, data, (err: unknown, result: Message) => {
      if (err) {
        resolve({
          ...data,
          status: MESSAGE_STATUS.FAILED,
        });
      }
      resolve(result);
    });
  });
}

// 发送已读回执
export function sendReadReport(fromId: string, lastSessionSeqNum: number) {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.emit(EVENT.chat.readReport, { fromId, lastSessionSeqNum });
}

// 发送同步消息信号
export function sendSyncMessage(syncUserMsgSeqNum: number) {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.emit(EVENT.chat.syncOffineMessages, syncUserMsgSeqNum);
}
