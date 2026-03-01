import { Socket } from "socket.io-client";
import { store } from "@/store";
import { EVENT, MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { SocketManager } from "./manager";

import { clearAuthData, updateMessagesReadStatus, insertMessage, updateSyncUserMsgSeqNum } from "@/features";
import { SuccessChatMessage, ReadReceipt } from "./types";

export const setupSocketListeners = (socket: Socket) => {
  socket.on(EVENT.SYSTEM.FORCE_LOGOUT, () => {
    SocketManager.getInstance().disconnect();
    store.dispatch(clearAuthData());
  });

  socket.on(EVENT.CHAT.NEW_MESSAGE, (payload: SuccessChatMessage, ack) => {
    ack({ ...payload, status: MESSAGE_STATUS.DELIVERED });

    store.dispatch(
      insertMessage({
        chatId: payload.fromId,
        message: {
          id: payload.id,
          fromId: payload.fromId,
          toId: payload.chatId,
          content: payload.content,
          sessionSeqNum: payload.sessionSeqNum,
          timestamp: payload.timestamp,
          type: MESSAGE_TYPE.TEXT,
          status: MESSAGE_STATUS.DELIVERED,
        },
      }),
    );
  });

  socket.on(EVENT.CHAT.READ_UPDATE, (data: ReadReceipt) => {
    store.dispatch(updateMessagesReadStatus(data));
  });

  socket.on(EVENT.CHAT.SYNC_OFFINE_MESSAGES, (data: SuccessChatMessage[], ack) => {
    if (data && data.length > 0) {
      ack(data[data.length - 1]);
    }
  });

  socket.on(EVENT.CHAT.UPDATE_SYNCUSERMSGSEQNUM, (data: number) => {
    store.dispatch(updateSyncUserMsgSeqNum(data));
  });
};
