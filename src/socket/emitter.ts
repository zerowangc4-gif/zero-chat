import { SocketClient } from "./socketClient";
import { MESSAGE_STATUS } from "@/constants";
import { Message } from "@/features/chat";
import { EVENT } from "./events";

const getSocket = () => {
  return SocketClient.getInstance().socket;
};

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
