import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageStatus = "pending" | "success" | "failed";

export type MessageType = "text" | "image" | "voice";

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: number;
  type: MessageType;
  status: MessageStatus;
}

interface ChatState {
  messagesByChatId: Record<string, IMessage[]>;
}

const initialState: ChatState = {
  messagesByChatId: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<{ chatId: string; message: IMessage }>) => {
      const { chatId, message } = action.payload;

      if (!state.messagesByChatId[chatId]) {
        state.messagesByChatId[chatId] = [];
      }

      const currentMessages = state.messagesByChatId[chatId];

      const existingIndex = currentMessages.findIndex(m => m.id === message.id);

      if (existingIndex !== -1) {
        currentMessages[existingIndex] = message;
      } else {
        currentMessages.push(message);
      }
    },
  },
});

export const { setMessage } = chatSlice.actions;
export default chatSlice.reducer;
