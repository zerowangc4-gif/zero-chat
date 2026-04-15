import { MessageStatus, MessageType } from "@/constants";

interface TextContent {
  text: string;
}

type ContentType = TextContent;

export enum ChatType {
  SINGLE = "single",
  GROUP = "group",
}

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

export interface UserInfo {
  username: string;
  publicKey: string;
  address: string;
  avatarSeed: string;
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
export interface ChatSession extends UserInfo {
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

export interface State {
  userId: string;
  user: UserInfo;
  friends: Record<string, UserInfo>;
  groupMembers: Record<string, UserInfo>;
  groupMembersDraft: Record<string, UserInfo>;
  GroupBasicSettingDraft: Record<string, string>;
  activeChatId: string;
  chatMap: Record<string, Record<string, Message>>;
  haveReadUserMap: Record<string, Message>;
  lastMessageMap: Record<string, Message>;
}
