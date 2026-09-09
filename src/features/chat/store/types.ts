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
  timestamp?: number;
  alias?: string;
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
  joinPrice?: string;
}

export const EMPTY_GROUP_BASIC_INFO: GroupBasicInfo = {
  seqNum: 0,
  ownerId: "",
  address: "",
  publicKey: "",
  name: "",
  avatarSeed: "",
  groupIntro: "",
  timestamp: 0,
  joinPrice: "0",
};

export interface GroupAllInfo {
  owner: UserInfo;
  group: GroupBasicInfo;
  groupMembers: UserInfo[];
  groupOwnerMembers: UserInfo[];
}

export interface WalletInfo {
  address: string;
  balance: number;
  ethBalance?: number;
  earned: number;
  tokenSymbol?: string;
  chain?: string;
  minAmount?: number;
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
  alias?: string;
  timestamp: number;
  lastMsg: string;
  chatType: ChatType;
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

export interface UserInfoProperty {
  fieldKey: string;
  value: string;
}

export type EditorTarget = "user" | "groupCreate" | "groupEdit";

export interface ContentType {
  text?: string;
  amount?: number;
  packetId?: string;
  paymentTxHash?: string;
  paymentTxHashes?: string[];
  tokenSymbol?: string;
  seqNum?: number;
  ownerId?: string;
  address?: string;
  publicKey?: string;
  name?: string;
  avatarSeed?: string;
  groupIntro?: string;
  timestamp?: number;
  joinPrice?: string;
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
  showTime?: boolean;
}

export interface State {
  user: UserInfo;
  userDraft: UserInfo;
  groupBasicInfoDraft: GroupBasicInfo;
  friends: Record<string, FriendInfo>;
  groupMembers: Record<string, UserInfo>;
  groupMembersDraft: Record<string, UserInfo>;
  groupBasicSettingDraft: Record<string, string>;
  haveJoinGroups: Record<string, GroupBasicInfo>;
  activeChatId: string;
  chatMap: Record<string, Record<string, Message>>;
  haveReadUserMap: Record<string, Message>;
  lastMessageMap: Record<string, Message>;
  wallet: WalletInfo | null;
}
