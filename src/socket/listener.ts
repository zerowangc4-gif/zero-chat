import { Socket } from "socket.io-client";
import { store } from "@/store";
import { MessageService } from "./messageService";
import { InsertChatMessages, SyncGroupChatMessages, updateMessagesStatus, TargetMsg } from "@/features/chat";
import { EVENT } from "./events";

export const setupSocketListeners = (socket: Socket) => {
  const service = MessageService.getInstance();

  // 强制下线
  socket.on(EVENT.system.forceLogout, () => {
    service.forceLogout();
  });

  // 监听新消息
  socket.on(EVENT.chat.chatMessage, () => {
    store.dispatch(InsertChatMessages());
  });

  // 监听群消息
  socket.on(EVENT.chat.groupChatMessage, () => {
    store.dispatch(SyncGroupChatMessages());
  });

  //同步信息状态
  socket.on(EVENT.chat.syncMessageStatus, (data: TargetMsg) => {
    store.dispatch(updateMessagesStatus(data));
  });
};
