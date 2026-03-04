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

  // 同步离线信息
  socket.on(EVENT.chat.syncOffineMessages, (data: Message[], ack) => {
    if (data && data.length > 0) {
      service.handleIncomingMessages(data);

      ack(data[data.length - 1]);
    }
  });

  // 同步离线私人消息序号
  socket.on(EVENT.chat.updateSyncUserChatMessageNum, (SyncUserChatMessageNum: number) => {
    service.handleUpdateSyncUserChatMessageNum(SyncUserChatMessageNum);
  });
};
