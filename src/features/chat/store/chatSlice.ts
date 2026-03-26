import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, TargetMsg } from "./types";
import { MESSAGE_STATUS, STATUS_WEIGHT } from "@/constants";
import { sortMessages } from "@/features/chat";

const initialState = { userId: "", activeChatId: "", chatMap: {}, haveReadUserMap: {} };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setActiveChatId: (state, action: PayloadAction<string>) => {
      if (state.activeChatId === action.payload) {
        return;
      }
      state.activeChatId = action.payload;
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
      const { chatId, sessionSeqNum, status } = action.payload;

      const currentChat = state.chatMap[chatId];

      if (!currentChat) return;

      const lastSessionSeqNum = Number(sessionSeqNum);
      const newStatusWeight = STATUS_WEIGHT[status] || 0;
      currentChat.forEach((item: Message) => {
        const currentWeight = STATUS_WEIGHT[item.status] || 0;
        if (
          Number(item.sessionSeqNum) <= lastSessionSeqNum &&
          newStatusWeight > currentWeight &&
          item.status !== MESSAGE_STATUS.FAILED
        ) {
          item.status = status;
        }
      });
    },
    updateHaveReadUserLatestMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;
      state.haveReadUserMap[message.fromId] = message;
    },
  },
});

export const {
  setUserId,
  setActiveChatId,
  insertMessages,
  updateMessage,
  updateMessagesStatus,
  updateHaveReadUserLatestMessage,
} = chatSlice.actions;

export const SendChatMessage = createAction<Message>("chat/SendMessage");

export const InsertChatMessages = createAction("chat/InsertChatMessage");

export const SyncHavedReadLatestMessage = createAction<Message>("chat/syncHavedReadLatestMessage");

export const InitChatData = createAction("chat/initChatData");

export default chatSlice.reducer;
