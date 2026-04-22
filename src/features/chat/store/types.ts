import { MessageStatus, MessageType } from "@/constants";

export enum ChatType {
  SINGLE = "single",
  GROUP = "group",
}

export interface UserInfo {
  name: string;
  publicKey: string;
  address: string;
  avatarSeed: string;
}

export interface FriendInfo extends UserInfo {
  timestamp: number;
}

export interface GroupBasicInfo {
  seqNum: number;
  ownerId: string;
  address: string;
  publicKey: string;
  name: string;
  avatarSeed: string;
  groupIntro: string;
  timestamp: number;
}

export interface InputProps {
  value: string;
  onChange: (text: string) => void;
}
export interface TargetMsg {
  chatId: string;
  id: string;
  sessionSeqNum: number;
  status: MessageStatus;
}
export interface ChatSession {
  address: string;
  publicKey: string;
  name: string;
  avatarSeed: string;
  time: number;
  lastMsg: string;
}
export interface EditableProperty {
  label: string;
  fieldKey: string;
  title: string;
  placeholder: string;
  onpress: (item: Omit<EditableProperty, "onpress" | "label">) => () => void;
}
export interface GroupBasicProperty {
  fieldKey: string;
  value: string;
}

interface TextContent {
  text: string;
}

export type ContentType = TextContent | GroupBasicInfo;

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  sessionSeqNum: number | string;
  content: ContentType;
  timestamp: number;
  type: MessageType;
  status: MessageStatus;
}

export interface State {
  userId: string;
  user: UserInfo;
  friends: Record<string, FriendInfo>;
  groupMembers: Record<string, UserInfo>;
  groupMembersDraft: Record<string, UserInfo>;
  groupBasicSettingDraft: Record<string, string>;
  haveJoinGroups: Record<string, GroupBasicInfo>;
  activeChatId: string;
  chatMap: Record<string, Record<string, Message>>;
  haveReadUserMap: Record<string, Message>;
  lastMessageMap: Record<string, Message>;
}
