import { SocketManager } from "./manager";

interface ChatMessagePayload {
  to: string;
  content: string;
  clientMsgId: string;
}

interface MessageAck {
  status: "delivered" | "sent_to_server" | "error";
  seqId?: number;
  message?: string;
}

export const socketEmitter = {
  /**
   *  发送私聊消息
   */
  sendMessage: (data: ChatMessagePayload): Promise<MessageAck> => {
    return new Promise(resolve => {
      const socket = SocketManager.getInstance().socket;
      if (!socket?.connected) {
        resolve({ status: "error", message: "Socket not connected" });
        return;
      }

      socket.emit("send_message", data, (ack: MessageAck) => {
        resolve(ack);
      });
    });
  },

  /**
   *  发送已读回执
   */
  sendReadReport: (from: string, lastReadSeqId: number) => {
    const socket = SocketManager.getInstance().socket;
    if (socket?.connected) {
      socket.emit("read_report", { from, lastReadSeqId });
    }
  },

  /**
   * 同步离线消息
   */
  syncOfflineMessages: (lastSeqId: number): Promise<unknown> => {
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
  },
};
