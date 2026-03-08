import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contacts, Message, TargetMsg } from "./types";
import { MESSAGE_STATUS } from "@/constants";
import { sortMessages } from "@/features/chat";

const initialState = { userId: "", chatMap: {}, haveReadUserMap: {}, contacts: [] };

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
    insertMessages: (state, action: PayloadAction<Message[]>) => {
      const chatIds = new Set<string>();
      action.payload.forEach((item: Message) => {
        const chatId = item.fromId === state.userId ? item.toId : item.fromId;
        chatIds.add(chatId);
        if (!state.chatMap[chatId]) {
          state.chatMap[chatId] = [];
        }
        const currentChat = state.chatMap[chatId];

        const isDuplicate = currentChat.some((msg: Message) => msg.id === item.id);

        if (!isDuplicate) {
          currentChat.push(item);
        }
      });
      chatIds.forEach(chatId => {
        if (state.chatMap[chatId]) {
          state.chatMap[chatId] = sortMessages(state.chatMap[chatId]);
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
          state.chatMap[chatId] = sortMessages(currentChat);
        }
      }
    },

    updateMessagesStatus: (state, action: PayloadAction<TargetMsg>) => {
      const { chatId, id, sessionSeqNum, status } = action.payload;

      const currentChat = state.chatMap[chatId];
      const message: Message | undefined = currentChat?.find((item: Message) => item.id === id);
      if (!message) {
        console.log("词条信息不在触发对账逻辑");
      }

      if (currentChat) {
        const lastSessionSeqNum = parseInt(String(sessionSeqNum), 10);

        currentChat.forEach((item: Message) => {
          if (
            typeof item.sessionSeqNum === "number" &&
            item.sessionSeqNum <= lastSessionSeqNum &&
            item.status !== MESSAGE_STATUS.FAILED
          ) {
            item.status = status;
          }
        });
      }
    },
    updateHaveReadUserLatestMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;
      state.haveReadUserMap[message.fromId] = message;
    },
  },
});

export const {
  setUserId,
  insertMessages,
  setContacts,
  updateMessage,
  updateMessagesStatus,
  updateHaveReadUserLatestMessage,
} = chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export const SendChatMessage = createAction<Message>("chat/SendMessage");

export const InsertChatMessages = createAction("chat/InsertChatMessage");

export const SyncHavedReadLatestMessage = createAction<Message>("chat/syncHavedReadLatestMessage");

export default chatSlice.reducer;
