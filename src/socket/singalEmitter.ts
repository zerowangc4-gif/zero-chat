import { Message } from "@/features/chat";
import { SocketClient } from "./socketClient";
import { MessageService } from "./messageService";
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

// 删除已读离线信息

export function removeReadOfflineMessages(message: Message) {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    return;
  }
  socket.emit(EVENT.chat.removeOffineMessages, message);
}
