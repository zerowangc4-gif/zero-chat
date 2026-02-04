/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io-client";
import { SocketManager } from "./manager";
import { store } from "@/store";
import { clearAuthData } from "@/features/auth";
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

  socket.on("new_message", (payload: unknown, ack: any) => {
    if (ack) {
      ack({ status: "ok" });
    }
  });

  socket.on("message_read_update", (data: any) => {
    // 更新本地消息的 UI 为“已读”
    console.log("对方已读更新:", data);
  });
};
