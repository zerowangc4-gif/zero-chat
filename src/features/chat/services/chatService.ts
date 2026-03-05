import { apiClient } from "@/api";
import { Message } from "@/features/chat";
export async function getContacts() {
  const result = await apiClient.get("/api/user/getContacts");
  return result;
}

export async function getOffineChatMessages(syncUserMsgSeqNum: number): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/getOffineChatMessages", {
    syncUserMsgSeqNum: syncUserMsgSeqNum,
  });
  return result;
}
