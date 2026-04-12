import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, TargetMsg, UserInfo, State } from "./types";
import { MESSAGE_STATUS, STATUS_WEIGHT } from "@/constants";
import { sortMessages } from "../utils";

const initialState: State = {
  userId: "",
  user: {
    address: "",
    publicKey: "",
    username: "",
    avatarSeed: "",
  },
  friends: {},
  groupMembers: {},
  groupMembersDraft: {},
  activeChatId: "",
  chatMap: {},
  lastMessageMap: {},
  haveReadUserMap: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatData: () => {
      return initialState;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    addFriends: (state, action: PayloadAction<UserInfo[]>) => {
      state.friends = state.friends || {};
      action.payload.forEach((item: UserInfo) => {
        state.friends[item.address] = item;
      });
    },
    clearGroupMembersDraft: state => {
      state.groupMembersDraft = {};
    },
    setGroupMembersDraft: (state, action: PayloadAction<Record<string, UserInfo>>) => {
      state.groupMembersDraft = action.payload || {};
    },
    setActiveChatId: (state, action: PayloadAction<string>) => {
      if (state.activeChatId === action.payload) {
        return;
      }
      state.activeChatId = action.payload;
    },

    insertMessages: (state, action: PayloadAction<Message[]>) => {
      action.payload.forEach((item: Message) => {
        const chatId = item.fromId === state.user.address ? item.toId : item.fromId;

        if (!state.chatMap[chatId]) {
          state.chatMap[chatId] = {};
        }

        state.chatMap[chatId][item.id] = item;

        const messages: Message[] = sortMessages([state.lastMessageMap[chatId] || item, item]);

        state.lastMessageMap[chatId] = messages[0];
      });
    },

    updateMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;
      const chatId = message.fromId === state.user.address ? message.toId : message.fromId;
      state.chatMap[chatId][message.id] = message;
      const messages: Message[] = sortMessages([state.lastMessageMap[chatId] || message, message]);
      state.lastMessageMap[chatId] = messages[0];
    },

    updateMessagesStatus: (state, action: PayloadAction<TargetMsg>) => {
      const { chatId, sessionSeqNum, status } = action.payload;
      const currentChat = state.chatMap[chatId];

      if (!currentChat) return;

      const lastSeq = Number(sessionSeqNum);
      const newStatusWeight = STATUS_WEIGHT[status] || 0;

      for (const msgId in currentChat) {
        const item = currentChat[msgId];
        const currentWeight = STATUS_WEIGHT[item.status] || 0;

        if (
          Number(item.sessionSeqNum) <= lastSeq &&
          newStatusWeight > currentWeight &&
          item.status !== MESSAGE_STATUS.FAILED
        ) {
          item.status = status;
        }
      }
    },
    updateHaveReadUserLatestMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;
      state.haveReadUserMap[message.fromId] = message;
    },
  },
});

export const {
  clearChatData,
  setUserInfo,
  setActiveChatId,
  clearGroupMembersDraft,
  setGroupMembersDraft,
  insertMessages,
  updateMessage,
  updateMessagesStatus,
  updateHaveReadUserLatestMessage,
  addFriends,
} = chatSlice.actions;

export const SendChatMessage = createAction<Message>("chat/SendMessage");

export const InsertChatMessages = createAction("chat/InsertChatMessage");

export const SyncHavedReadLatestMessage = createAction<Message>("chat/syncHavedReadLatestMessage");

export const InitChatData = createAction("chat/initChatData");

export default chatSlice.reducer;
