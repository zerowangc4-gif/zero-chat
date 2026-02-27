import { store } from "@/store";
import { SocketManager } from "./manager";
import { MessageStatus, Message, batchInsertMessages } from "@/features/chat";

interface ChatMessagePayload {
  toId: string;
  content: string;
  clientMsgId: string;
}

interface MessageAck {
  chatId: string;
  id: string;
  status: MessageStatus;
  sessionSeqNum?: number;
  timestamp: number;
}

// 发送私聊消息
export function sendMessage(data: ChatMessagePayload): Promise<MessageAck> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({
        chatId: data.toId,
        id: data.clientMsgId,
        status: "failed",
        timestamp: Date.now(),
      });
      return;
    }
    socket.timeout(5000).emit("send_message", data, (err: unknown, ack: MessageAck) => {
      if (err) {
        resolve({
          chatId: data.toId,
          id: data.clientMsgId,
          status: "failed",
          timestamp: Date.now(),
        });
      }
      resolve(ack);
    });
  });
}

// 发送已读回执
export function sendReadReport(fromId: string, lastSessionSeqNum: number) {
  const socket = SocketManager.getInstance().socket;

  if (socket?.connected) {
    socket.emit("read_report", { fromId, lastSessionSeqNum });
  }
}

// 离线同步消息
export function syncOfflineMessages(lastSyncUserMsgSeqNum: number): Promise<unknown> {
  return new Promise(resolve => {
    const socket = SocketManager.getInstance().socket;
    if (!socket?.connected) {
      resolve({ status: "failed", message: "Socket not connected" });
      return;
    }

    socket.emit("sync_offline_messages", { lastSyncUserMsgSeqNum }, (response: unknown) => {
      resolve(response);
    });
  });
}

export async function startSync() {
  const state = store.getState();
  const chatMap = state.chat.chatMap;

  const lastSessionSeqNum = Math.max(
    ...Object.values(chatMap)
      .filter((m: Message) => m.toId === state.auth.user.address)
      .map((m: Message) => m.syncUserMsgSeqNum ?? 0),
    0,
  );

  const response = (await syncOfflineMessages(lastSessionSeqNum)) as {
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
