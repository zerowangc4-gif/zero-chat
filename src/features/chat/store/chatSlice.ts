import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageStatus = "pending" | "sentToServer" | "delivered" | "read" | "failed";

export type MessageType = "text" | "image" | "voice";

export interface Contacts {
  id: number;
  username: string;
  publicKey: string;
  address: string;
  avatarSeed: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  sessionSeqNum?: number;
  syncUserMsgSeqNum?: number;
  fromId: string;
  toId: string;
  content: string;
  timestamp: number;
  type: MessageType;
  status: MessageStatus;
}

export interface Messages {
  chatMap: {
    [key: string]: Message[];
  };
}
export interface MessagePayload {
  chatId: string;
  message: Message;
}

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
    updateMessage: (
      state,
      action: PayloadAction<{
        chatId: string;
        id: string;
        status: MessageStatus;
        sessionSeqNum?: number;
      }>,
    ) => {
      const { chatId, id, status, sessionSeqNum } = action.payload;
      const messages = state.chatMap[chatId];

      if (messages) {
        const msg = messages.find((message: Message) => message.id === id);
        if (msg) {
          msg.status = status;
          if (typeof sessionSeqNum === "number") {
            msg.sessionSeqNum = sessionSeqNum;
          }
        }
      }
    },
    updateMessagesReadStatus: (state, action: PayloadAction<{ readerId: string; lastSessionSeqNum: number }>) => {
      const { readerId, lastSessionSeqNum } = action.payload;
      const messages = state.chatMap[readerId];
      if (messages) {
        messages.forEach((msg: Message) => {
          if (
            msg.status !== "read" &&
            typeof msg.sessionSeqNum === "number" &&
            msg.sessionSeqNum <= lastSessionSeqNum
          ) {
            msg.status = "read";
          }
        });
      }
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
