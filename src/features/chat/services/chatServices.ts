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
export async function syncChatMessages(syncUserMsgSeqNum: number): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncChatMessages", {
    syncUserMsgSeqNum: syncUserMsgSeqNum,
  });
  return result;
}

// 删除已经同步过的信息
export async function deleteHavedSyncMessages(message: Message): Promise<number> {
  const result: number = await apiClient.post("/api/chat/deleteHavedSyncMessages", message);
  return result;
}

// 同步已发信息状态
export async function syncMessagesStatus(): Promise<Message> {
  const result: Message = await apiClient.get("/api/chat/syncMessagesStatus");
  return result;
}
