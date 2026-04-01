import { MessageStatus, MessageType } from "@/constants";

export interface UserInfo {
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
export interface ChatSession extends UserInfo {
  time: number;
  lastMsg: string;
}
export interface State {
  userId: string;
  user: UserInfo;
  friends: Record<string, UserInfo>;
  activeChatId: string;
  chatMap: Record<string, Message[]>;
  haveReadUserMap: Record<string, Message>;
}
