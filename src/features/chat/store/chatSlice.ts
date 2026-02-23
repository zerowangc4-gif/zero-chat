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
  seqId?: number;
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
    updateMessageStatus: (
      state,
      action: PayloadAction<{
        chatId: string;
        id: string;
        status: MessageStatus;
        seqId?: number;
      }>,
    ) => {
      const { chatId, id, status, seqId } = action.payload;
      const messages = state.chatMap[chatId];

      if (messages) {
        const msg = messages.find((message: Message) => message.id === id);
        if (msg) {
          msg.status = status;
          if (typeof seqId === "number") {
            msg.seqId = seqId;
          }
        }
      }
    },
    updateMessagesReadStatus: (state, action: PayloadAction<{ readerId: string; lastReadSeqId: number }>) => {
      const { readerId, lastReadSeqId } = action.payload;
      const messages = state.chatMap[readerId];
      console.log("Action Payload:", action.payload);
      console.log("Current Messages List:", JSON.parse(JSON.stringify(messages)));
      if (messages) {
        messages.forEach((msg: Message) => {
          if (
            msg.toId === readerId &&
            msg.status !== "read" &&
            typeof msg.seqId === "number" &&
            msg.seqId <= lastReadSeqId
          ) {
            msg.status = "read";
          }
        });
      }
    },
    batchInsertMessages: (state, action: PayloadAction<Message[]>) => {
      const newMessages = action.payload;

      newMessages.forEach(msg => {
        const chatId = msg.fromId;

        if (!state.chatMap[chatId]) {
          state.chatMap[chatId] = [];
        }

        const isExist = state.chatMap[chatId].some(m => m.seqId === msg.seqId);

        if (!isExist) {
          state.chatMap[chatId].push({
            ...msg,
            status: "delivered",
          });
        }
      });

      const affectedChatIds = Array.from(new Set(newMessages.map(m => m.fromId)));
      affectedChatIds.forEach(id => {
        state.chatMap[id]?.sort((a: Message, b: Message) => (a.seqId || 0) - (b.seqId || 0));
      });
    },
  },
});

export const { insertMessage, setContacts, updateMessageStatus, updateMessagesReadStatus, batchInsertMessages } =
  chatSlice.actions;

export const fetchContacts = createAction("chat/contacts");

export default chatSlice.reducer;
