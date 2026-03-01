import { MessageStatus, MessageType } from "@/constants";

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
  fromId: string;
  toId: string;
  content: string;
  timestamp: number;
  type: MessageType;
  status: MessageStatus;
}

export interface Messages {
  syncUserMsgSeqNum: number;
  chatMap: {
    [key: string]: Message[];
  };
}
export interface MessagePayload {
  chatId: string;
  message: Message;
}
