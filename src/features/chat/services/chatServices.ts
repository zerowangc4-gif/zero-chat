import { apiClient } from "@/api";
import { Message, TargetMsg, UserInfo, GroupBasicInfo } from "@/features/chat";

// 发送消息
export async function sendMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendMessage", message);
  return result;
}

// 接收消息
export async function syncChatMessages(activeChatId: string): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncChatMessages", {
    activeChatId: activeChatId,
  });
  return result;
}

// 删除已经同步过的信息
export async function deleteHavedSyncMessages(message: Message): Promise<void> {
  await apiClient.post("/api/chat/deleteHavedSyncMessages", message);
}

// 同步已经读过的最新信息
export async function syncHavedReadLatestMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/syncHavedReadLatestMessage", message);
  return result;
}

// 同步离线时的信息状态
export async function syncMessageStatus(): Promise<TargetMsg[]> {
  const result: TargetMsg[] = await apiClient.post("/api/chat/syncMessageStatus");
  return result;
}

// 添加好友时，搜索用户信息
export async function searchUserResult(value: string): Promise<UserInfo> {
  const result: UserInfo = await apiClient.post("/api/chat/searchUserResult", {
    address: value,
  });
  return result;
}

// 创建群组时，获取最新的群组号，以便根据主私钥派生出副本账号
export async function getGroupSeqNum(): Promise<number> {
  const result: number = await apiClient.post("/api/chat/getGroupSeqNum");
  return result;
}

// 创建群组
export async function createGroup(groupBasicInfo: GroupBasicInfo): Promise<GroupBasicInfo> {
  const result: GroupBasicInfo = await apiClient.post("/api/chat/createGroup", groupBasicInfo);
  return result;
}

// 加入聊天群
export async function joinGroup(groupId: string): Promise<GroupBasicInfo> {
  const result: GroupBasicInfo = await apiClient.post("/api/chat/joinGroup", { groupId: groupId });
  return result;
}

// 发送群消息
export async function sendGroupMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendGroupMessage", message);
  return result;
}

// 同步群离线信息
export async function syncGroupChatMessages(activeChatId: string): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncGroupChatMessages", {
    activeChatId: activeChatId,
  });
  return result;
}
