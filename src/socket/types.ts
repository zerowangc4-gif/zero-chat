import { MessageStatus } from "@/constants";

export interface SocketContextType {
  isConnected: boolean;
}
export interface SocketProviderType {
  token: string;
  children: React.ReactNode;
}

export interface SendMessage {
  toId: string;
  content: string;
  clientMsgId: string;
}

export interface SuccessChatMessage {
  chatId: string;
  fromId: string;
  id: string;
  content: string;
  status: MessageStatus;
  sessionSeqNum: number;
  timestamp: number;
}

export interface FailedChatMessage {
  chatId: string;
  id: string;
  status: MessageStatus;
  timestamp: number;
  sessionSeqNum?: number;
}

export type ChatMessage = SuccessChatMessage | FailedChatMessage;

export interface ReadReceipt {
  chatId: string;
  lastSessionSeqNum: number;
}
