import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Message,
  TargetMsg,
  UserInfo,
  UserInfoProperty,
  FriendInfo,
  GroupBasicInfo,
  GroupBasicProperty,
  State,
  ContentType,
  WalletInfo,
  EMPTY_GROUP_BASIC_INFO,
} from "./types";
import { MESSAGE_STATUS, STATUS_WEIGHT } from "@/constants";
import { sortMessages, resolveChatId } from "../utils";

const initialState: State = {
  user: {
    address: "",
    publicKey: "",
    name: "",
    avatarSeed: "",
  },
  userDraft: {
    address: "",
    publicKey: "",
    name: "",
    avatarSeed: "",
  },
  groupBasicInfoDraft: EMPTY_GROUP_BASIC_INFO,
  friends: {},
  groupMembers: {},
  groupMembersDraft: {},
  groupBasicSettingDraft: {},
  haveJoinGroups: {},
  activeChatId: "",
  chatMap: {},
  lastMessageMap: {},
  haveReadUserMap: {},
  wallet: null,
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
    setUserDraft: (state, action: PayloadAction<UserInfo>) => {
      state.userDraft = action.payload;
    },
    setGroupBasicInfoDraft: (state, action: PayloadAction<GroupBasicInfo>) => {
      state.groupBasicInfoDraft = action.payload;
    },
    setUserDraftProperty: (state, action: PayloadAction<UserInfoProperty>) => {
      const { fieldKey, value } = action.payload;
      state.userDraft[fieldKey] = value;
    },
    setFriends: (state, action: PayloadAction<FriendInfo[]>) => {
      state.friends = state.friends || {};
      action.payload.forEach((item: FriendInfo) => {
        state.friends[item.address] = { ...state.friends[item.address], ...item };
      });
    },
    setFriendInfos: (state, action: PayloadAction<UserInfo[]>) => {
      action.payload.forEach(item => {
        const existingFriend = state.friends[item.address];

        if (existingFriend) {
          if (!existingFriend.alias || existingFriend.alias === existingFriend.name) {
            existingFriend.alias = item.name;
          }

          existingFriend.name = item.name;
          existingFriend.avatarSeed = item.avatarSeed;
        }
      });
    },
    clearGroupMembersDraft: state => {
      state.groupMembersDraft = {};
    },
    clearGroupBasicSettingDraft: state => {
      state.groupBasicSettingDraft = {};
    },
    setGroupMembersDraft: (state, action: PayloadAction<Record<string, UserInfo>>) => {
      state.groupMembersDraft = action.payload || {};
    },
    setGroupBasicSettingDraft: (state, action: PayloadAction<GroupBasicProperty>) => {
      const { fieldKey, value } = action.payload;
      state.groupBasicSettingDraft[fieldKey] = value;
    },
    setHaveJoinGroups(state, action: PayloadAction<GroupBasicInfo>) {
      const { address } = action.payload;
      state.haveJoinGroups[address] = action.payload;
    },
    removeHaveJoinGroup(state, action: PayloadAction<string>) {
      delete state.haveJoinGroups[action.payload];
      delete state.chatMap[action.payload];
      delete state.lastMessageMap[action.payload];
      if (state.activeChatId === action.payload) {
        state.activeChatId = "";
      }
    },
    setGroupMembers(state, action: PayloadAction<UserInfo[]>) {
      state.groupMembers = state.groupMembers || {};
      action.payload.forEach((item: UserInfo) => {
        state.groupMembers[item.address] = item;
      });
    },
    setWallet(state, action: PayloadAction<WalletInfo>) {
      state.wallet = action.payload;
    },
    setActiveChatId: (state, action: PayloadAction<string>) => {
      if (state.activeChatId === action.payload) {
        return;
      }
      state.activeChatId = action.payload;
    },

    insertMessages: (state, action: PayloadAction<Message[]>) => {
      action.payload.forEach((item: Message) => {
        const chatId = resolveChatId(item, state.user.address, state.haveJoinGroups);

        if (!state.chatMap[chatId]) {
          state.chatMap[chatId] = {};
        }

        state.chatMap[chatId][item.id] = item;

        const messages: Message[] = sortMessages([state.lastMessageMap[chatId] || item, item]);

        state.lastMessageMap[chatId] = messages[0];
      });
    },
    insertGroupMessages: (state, action: PayloadAction<Message[]>) => {
      action.payload.forEach((item: Message) => {
        const chatId = item.toId;

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
      const chatId = resolveChatId(message, state.user.address, state.haveJoinGroups);
      if (!state.chatMap[chatId]) {
        state.chatMap[chatId] = {};
      }
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
      const chatId = resolveChatId(message, state.user.address, state.haveJoinGroups);
      state.haveReadUserMap[chatId] = message;
    },
  },
});

export const {
  clearChatData,
  setUserInfo,
  setActiveChatId,
  clearGroupMembersDraft,
  clearGroupBasicSettingDraft,
  setGroupBasicSettingDraft,
  setGroupMembersDraft,
  setHaveJoinGroups,
  removeHaveJoinGroup,
  insertMessages,
  insertGroupMessages,
  updateMessage,
  updateMessagesStatus,
  updateHaveReadUserLatestMessage,
  setFriends,
  setFriendInfos,
  setGroupMembers,
  setUserDraft,
  setUserDraftProperty,
  setGroupBasicInfoDraft,
  setWallet,
} = chatSlice.actions;

export const SendChatMessage = createAction<Message>("chat/SendMessage");

export const InsertChatMessages = createAction("chat/InsertChatMessage");

export const SyncHavedReadLatestMessage = createAction<Message>("chat/syncHavedReadLatestMessage");

export const InitChatData = createAction("chat/initChatData");

export const CreateGroup = createAction<GroupBasicInfo>("chat/CreateGroup");

export const JoinGroup = createAction<{
  content: ContentType;
  paymentTxHash?: string;
}>("chat/JoinGroup");

export const SendGroupMessage = createAction<Message>("chat/SendGroupMessage");

export const SyncGroupChatMessages = createAction("chat/SyncGroupChatMessages");

export const InviteGroupMembers = createAction<{ groupId: string; memberIds: string[] }>(
  "chat/InviteGroupMembers",
);

export const SendRedPacket = createAction<Message>("chat/SendRedPacket");

export default chatSlice.reducer;
