import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contacts, MessagePayload, Message } from "./types";
import { ChatMessagePayload, ReadReceipt } from "@/socket";

const initialState = { chatMap: {}, contacts: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contacts[]>) => {
      state.contacts = action.payload;
    },
    insertMessage: (state, action: PayloadAction<MessagePayload>) => {
      const { chatId, message } = action.payload;
      if (!state.chatMap) {
        state.chatMap = {};
      }
      if (!state.chatMap[chatId]) {
        state.chatMap[chatId] = [];
      }
      state.chatMap[chatId].unshift(message);
    },
    updateMessage: (state, action: PayloadAction<ChatMessagePayload>) => {
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
          item.status !== "read"
        ) {
          item.status = "read";
        }
      });
    },
    batchInsertMessages: (_state, action: PayloadAction<Message[]>) => {
      console.log(action.payload);
    },
  },
});

export const { insertMessage, setContacts, updateMessage, updateMessagesReadStatus, batchInsertMessages } =
  chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export default chatSlice.reducer;
