import { Socket } from "socket.io-client";
import { SocketManager } from "./manager";
import { store } from "@/store";
import { clearAuthData, insertMessage, MessagePayload, MessageStatus, updateMessagesReadStatus } from "@/features";
interface LogoutMessage {
  reason: string;
  time: number;
}
export interface ChatMessagePayload {
  fromId: string;
  toId: string;
  seqId: number;
  content: string;
  clientMsgId: string;
  timestamp: number;
}

export interface MessageAck {
  status: MessageStatus;
  message?: string;
  seqId?: number;
}

export type AckCallback = (response: MessageAck) => void;

export const setupSocketListeners = (socket: Socket) => {
  socket.on("force_logout", (data: LogoutMessage) => {
    console.error(data.reason);
    SocketManager.getInstance().disconnect();
    store.dispatch(clearAuthData());
  });

  socket.on("new_message", (payload: ChatMessagePayload, ack: AckCallback) => {
    if (ack) {
      ack({ status: "delivered" });
    }
    const messageForRedux: MessagePayload = {
      chatId: payload.fromId,
      message: {
        id: payload.clientMsgId,
        fromId: payload.fromId,
        toId: payload.toId,
        content: payload.content,
        timestamp: payload.timestamp,
        seqId: payload.seqId,
        status: "delivered",
        type: "text",
      },
    };

    store.dispatch(insertMessage(messageForRedux));
  });

  socket.on("message_read_update", (data: { readerId: string; lastReadSeqId: number }) => {
    console.log(data);
    store.dispatch(updateMessagesReadStatus(data));
  });
};
