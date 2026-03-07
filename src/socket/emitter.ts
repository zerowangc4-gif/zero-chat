import { SocketClient } from "./socketClient";
import { MessageService } from "./messageService";

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
  const messageService = getMessageService();
  messageService.handleHeartbeatAck();
}
