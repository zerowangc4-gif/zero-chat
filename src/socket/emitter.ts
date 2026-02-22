import { store } from "@/store";
import { SocketManager } from "./manager";
import { MessageStatus, Message, batchInsertMessages } from "@/features/chat";

interface ChatMessagePayload {
  toId: string;
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

    socket.timeout(5000).emit("send_message", data, (err: unknown, ack: MessageAck) => {
      if (err) {
        return resolve({ status: "failed", message: "timeout" });
      } else {
        resolve(ack);
      }
    });
  });
}

// 发送已读回执
export function sendReadReport(fromId: string, lastReadSeqId: number) {
  const socket = SocketManager.getInstance().socket;
  if (socket?.connected) {
    socket.emit("read_report", { fromId, lastReadSeqId });
  }
}

// 离线同步消息
export function syncOfflineMessages(lastSeqId: number): Promise<unknown> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({ status: "failed", message: "Socket not connected" });
      return;
    }

    socket.emit("sync_offline_messages", { lastSeqId }, (response: unknown) => {
      resolve(response);
    });
  });
}

export async function startSync() {
  const state = store.getState();
  const chatMap = state.chat.chatMap;

  let maxSeqId = 0;

  Object.values(chatMap).forEach((messages: Message[]) => {
    messages.forEach(msg => {
      if (msg.seqId && msg.seqId > maxSeqId) {
        maxSeqId = msg.seqId;
      }
    });
  });

  const myLastNumber = maxSeqId;

  const response = (await syncOfflineMessages(myLastNumber)) as {
    status: MessageStatus;
    data: Message[];
  };

  if (response.status === "delivered") {
    const newMessages = response.data;
    if (newMessages.length > 0) {
      store.dispatch(batchInsertMessages(newMessages));
    }
  }
}
