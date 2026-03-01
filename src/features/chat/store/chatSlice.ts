import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ReadReceipt } from "@/socket";
import { Contacts, MessagePayload, Message } from "./types";
import { MESSAGE_STATUS } from "@/constants";

const initialState = { syncUserMsgSeqNum: 0, chatMap: {}, contacts: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contacts[]>) => {
      state.contacts = action.payload;
    },
    updateSyncUserMsgSeqNum: (state, action: PayloadAction<number>) => {
      state.syncUserMsgSeqNum = action.payload;
    },
    insertMessage: (state, action: PayloadAction<MessagePayload>) => {
      const { chatId, message } = action.payload;

      if (!state.chatMap[chatId]) {
        state.chatMap[chatId] = [];
      }
      state.chatMap[chatId].unshift(message);
    },
    updateMessage: (state, action: PayloadAction<ChatMessage>) => {
      const { chatId, id, status, sessionSeqNum, timestamp } = action.payload;

      const message = state.chatMap[chatId].find((item: Message) => item.id === id);
      if (message) {
        message.sessionSeqNum = sessionSeqNum;
        message.timestamp = timestamp;
        message.status = status;
      }
    },
    updateMessagesReadStatus: (state, action: PayloadAction<ReadReceipt>) => {
      const { chatId, lastSessionSeqNum } = action.payload;
      state.chatMap[chatId].forEach((item: Message) => {
        if (
          typeof item.sessionSeqNum === "number" &&
          item.sessionSeqNum <= lastSessionSeqNum &&
          item.status !== MESSAGE_STATUS.READ
        ) {
          item.status = MESSAGE_STATUS.READ;
        }
      });
    },
    batchInsertMessages: () => {},
  },
});

export const { insertMessage, setContacts, updateMessage, updateMessagesReadStatus, updateSyncUserMsgSeqNum } =
  chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export default chatSlice.reducer;
