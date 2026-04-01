import { apiClient } from "@/api";
import { Message, TargetMsg, UserInfo } from "@/features/chat";

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
