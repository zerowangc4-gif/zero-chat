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
};
