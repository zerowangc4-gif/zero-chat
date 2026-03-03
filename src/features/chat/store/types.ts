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
  fromId: string;
  toId: string;
  sessionSeqNum: number | string;
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
