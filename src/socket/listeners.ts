import { Socket } from "socket.io-client";
import { SocketManager } from "./manager";
import { store } from "@/store";
import { clearAuthData, updateMessagesReadStatus } from "@/features";
import { ChatMessagePayload, ReadReceipt } from "./types";

interface LogoutMessage {
  reason: string;
  time: number;
}

export const setupSocketListeners = (socket: Socket) => {
  socket.on("force_logout", (data: LogoutMessage) => {
    console.error(data.reason);
    SocketManager.getInstance().disconnect();
    store.dispatch(clearAuthData());
  });

  socket.on("new_message", (payload: ChatMessagePayload, ack) => {
    ack({ ...payload, status: "delivered" });
  });

  socket.on("message_read_update", (data: ReadReceipt) => {
    store.dispatch(updateMessagesReadStatus(data));
  });
};
