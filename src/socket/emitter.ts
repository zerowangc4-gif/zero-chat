import { SocketManager } from "./manager";
import { MessageStatus } from "@/features/chat";

interface ChatMessagePayload {
  to: string;
  content: string;
  clientMsgId: string;
}

interface MessageAck {
  status: MessageStatus;
  seqId?: number;
  message?: string;
}

// 发送私聊消息
export function sendMessage(data: ChatMessagePayload): Promise<MessageAck> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({ status: "failed", message: "Socket not connected" });
      return;
    }

    socket.emit("send_message", data, (ack: MessageAck) => {
      console.log(ack);
      resolve(ack);
    });
  });
}

// 发送已读回执
export function sendReadReport(from: string, lastReadSeqId: number) {
  const socket = SocketManager.getInstance().socket;
  if (socket?.connected) {
    socket.emit("read_report", { from, lastReadSeqId });
  }
}

//  同步离线消息
export function syncOfflineMessages(lastSeqId: number): Promise<unknown> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({ status: "error", message: "Socket not connected" });
      return;
    }

    socket.emit("sync_offline_messages", { lastSeqId }, (response: unknown) => {
      resolve(response);
    });
  });
}
