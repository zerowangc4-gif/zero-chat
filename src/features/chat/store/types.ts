import { MessageStatus, MessageType } from "@/constants";

export interface Contacts {
  username: string;
  publicKey: string;
  address: string;
  avatarSeed: string;
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
export interface TargetMsg {
  chatId: string;
  id: string;
  sessionSeqNum: number;
  status: MessageStatus;
}

export interface Messages {
  syncUserMsgSeqNum: number;
  chatMap: {
    [key: string]: Message[];
  };
}
