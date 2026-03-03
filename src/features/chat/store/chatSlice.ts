import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadReceipt } from "@/socket";
import { Contacts, Message } from "./types";
import { MESSAGE_STATUS } from "@/constants";

const initialState = { userId: "", syncUserMsgSeqNum: 0, chatMap: {}, contacts: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contacts[]>) => {
      state.contacts = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    updateSyncUserMsgSeqNum: (state, action: PayloadAction<number>) => {
      state.syncUserMsgSeqNum = action.payload;
    },
    insertMessages: (state, action: PayloadAction<Message[]>) => {
      action.payload.forEach((item: Message) => {
        const chatId = item.fromId === state.userId ? item.toId : item.fromId;

        if (!state.chatMap[chatId]) {
          state.chatMap[chatId] = [];
        }
        const currentChat = state.chatMap[chatId];

        const isDuplicate = currentChat.some((msg: Message) => msg.id === item.id);

        if (!isDuplicate) {
          currentChat.push(item);
        }
      });
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;

      const chatId = message.fromId === state.userId ? message.toId : message.fromId;

      const currentChat = state.chatMap[chatId];

      if (currentChat) {
        const index = currentChat.findIndex((item: Message) => item.id === message.id);
        if (index !== -1) {
          currentChat[index] = message;
        }
      }
    },
    updateMessagesReadStatus: (state, action: PayloadAction<ReadReceipt>) => {
      const { chatId, lastSessionSeqNum } = action.payload;
      const currentChat = state.chatMap[chatId];
      if (currentChat) {
        currentChat.forEach((item: Message) => {
          if (
            typeof item.sessionSeqNum === "number" &&
            item.sessionSeqNum <= lastSessionSeqNum &&
            item.status !== MESSAGE_STATUS.READ
          ) {
            item.status = MESSAGE_STATUS.READ;
          }
        });
      }
    },
  },
});

export const {
  setUserId,
  insertMessages,
  setContacts,
  updateMessage,
  updateMessagesReadStatus,
  updateSyncUserMsgSeqNum,
} = chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export default chatSlice.reducer;
