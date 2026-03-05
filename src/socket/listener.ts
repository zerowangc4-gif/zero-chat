import { Socket } from "socket.io-client";
import { MESSAGE_STATUS } from "@/constants";
import { MessageService } from "./MessageService";
import { EVENT } from "./events";
import { Message, ReadReceipt } from "@/features/chat";

export const setupSocketListeners = (socket: Socket) => {
  const service = MessageService.getInstance();

  // 强制下线
  socket.on(EVENT.system.forceLogout, () => {
    service.forceLogout();
  });

  // 新私聊消息
  socket.on(EVENT.chat.chatMessage, (message: Message, ack) => {
    ack({ ...message, status: MESSAGE_STATUS.DELIVERED });
    service.handleIncomingMessages([message]);
  });

  //   已读更新
  socket.on(EVENT.chat.readUpdate, (data: ReadReceipt) => {
    service.handleupdateMessagesReadStatus(data);
  });

  // 更新同步过的离线私人信息的最大序号
  socket.on(EVENT.chat.updateSyncUserChatMessageNum, (SyncUserChatMessageNum: number) => {
    service.handleUpdateSyncUserChatMessageNum(SyncUserChatMessageNum);
  });
};
