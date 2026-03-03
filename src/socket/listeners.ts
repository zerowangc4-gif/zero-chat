import { Socket } from "socket.io-client";
import { store } from "@/store";
import { EVENT, MESSAGE_STATUS } from "@/constants";
import { SocketManager } from "./manager";

import { clearAuthData, insertMessages, Message, updateMessagesReadStatus, updateSyncUserMsgSeqNum } from "@/features";
import { ReadReceipt } from "./types";

export const setupSocketListeners = (socket: Socket) => {
  socket.on(EVENT.SYSTEM.FORCE_LOGOUT, () => {
    SocketManager.getInstance().disconnect();
    store.dispatch(clearAuthData());
  });

  socket.on(EVENT.CHAT.NEW_MESSAGE, (message: Message, ack) => {
    ack({ ...message, status: MESSAGE_STATUS.DELIVERED });

    store.dispatch(insertMessages([message]));
  });

  socket.on(EVENT.CHAT.READ_UPDATE, (data: ReadReceipt) => {
    store.dispatch(updateMessagesReadStatus(data));
  });

  socket.on(EVENT.CHAT.SYNC_OFFINE_MESSAGES, (data: Message[], ack) => {
    try {
      if (data && data.length > 0) {
        store.dispatch(insertMessages(data));

        if (typeof ack === "function") {
          ack(data[data.length - 1]);
        }
      }
    } finally {
      SocketManager.getInstance().isSyncing = false;
    }
  });

  socket.on(EVENT.CHAT.UPDATE_SYNCUSERMSGSEQNUM, (data: number) => {
    store.dispatch(updateSyncUserMsgSeqNum(data));
  });
};
