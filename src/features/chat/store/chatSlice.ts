import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageStatus = "pending" | "sent_to_server" | "delivered" | "read" | "failed";

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
  toId: string;
  fromId: string;
  content: string;
  createdAt: number;
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
    updateMessageStatus: (state, action: PayloadAction<{ chatId: string; id: string; status: MessageStatus }>) => {
      const { chatId, id, status } = action.payload;
      const messages = state.chatMap[chatId];
      if (messages) {
        const msg = messages.find((message: Message) => message.id === id);
        if (msg) {
          msg.status = status;
        }
      }
    },
  },
});

export const { insertMessage, setContacts, updateMessageStatus } = chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export default chatSlice.reducer;
