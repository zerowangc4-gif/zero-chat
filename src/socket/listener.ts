import { Socket } from "socket.io-client";
import { store } from "@/store";
import { MessageService } from "./messageService";
import {
  InsertChatMessages,
  SyncGroupChatMessages,
  updateMessagesStatus,
  TargetMsg,
  UserInfo,
  setFriendInfos,
  removeHaveJoinGroup,
} from "@/features/chat";
import { EVENT } from "./events";

export const setupSocketListeners = (socket: Socket) => {
  const service = MessageService.getInstance();

  socket.on(EVENT.system.forceLogout, () => {
    service.forceLogout();
  });

  socket.on(EVENT.chat.chatMessage, () => {
    store.dispatch(InsertChatMessages());
  });

  socket.on(EVENT.chat.groupChatMessage, () => {
    store.dispatch(SyncGroupChatMessages());
  });

  socket.on(EVENT.chat.syncMessageStatus, (data: TargetMsg) => {
    store.dispatch(updateMessagesStatus(data));
  });

  socket.on(EVENT.user.updateFriendInfo, (data: UserInfo) => {
    if (data) {
      store.dispatch(setFriendInfos([data]));
    }
  });

  socket.on(EVENT.chat.groupRemoved, (data: { groupId?: string }) => {
    if (data?.groupId) {
      store.dispatch(removeHaveJoinGroup(data.groupId));
    }
  });
};
