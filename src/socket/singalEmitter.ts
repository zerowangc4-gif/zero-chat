import { Message } from "@/features/chat";
import { SocketClient } from "./SocketClient";
import { MessageService } from "./MessageService";
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

//同步好友离线消息
export function sendSyncMessage(syncUserMsgSeqNum: number) {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.emit(EVENT.chat.syncOffineMessages, syncUserMsgSeqNum, (err: unknown, data: Message[]) => {
    const service = MessageService.getInstance();
    if (!err && data && data.length > 0) {
      service.handleIncomingMessages(data);
      removeReadOfflineMessages(data[data.length - 1]);
    }
  });
}

// 删除已读离线信息

export function removeReadOfflineMessages(message: Message) {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.emit(EVENT.chat.removeOffineMessages, message);
}
