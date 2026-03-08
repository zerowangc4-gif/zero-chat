import { apiClient } from "@/api";
import { Message } from "@/features/chat";
export async function getContacts() {
  const result = await apiClient.get("/api/user/getContacts");
  return result;
}

// 发送消息
export async function sendMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendMessage", message);
  return result;
}

// 接收消息
export async function syncChatMessages(): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncChatMessages");
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
