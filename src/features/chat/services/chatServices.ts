import { apiClient } from "@/api";
import { Message, TargetMsg, UserInfo, GroupBasicInfo, GroupAllInfo, WalletInfo } from "@/features/chat";

export async function sendMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendMessage", message);
  return result;
}

export async function syncChatMessages(activeChatId: string): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncChatMessages", {
    activeChatId: activeChatId,
  });
  return result;
}

export async function deleteHavedSyncMessages(message: Message): Promise<void> {
  await apiClient.post("/api/chat/deleteHavedSyncMessages", message);
}

export async function syncHavedReadLatestMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/syncHavedReadLatestMessage", message);
  return result;
}

export async function syncMessageStatus(): Promise<TargetMsg[]> {
  const result: TargetMsg[] = await apiClient.post("/api/chat/syncMessageStatus");
  return result;
}

export async function searchUserResult(value: string): Promise<UserInfo> {
  const result: UserInfo = await apiClient.post("/api/chat/searchUserResult", {
    address: value,
  });
  return result;
}

export async function getGroupSeqNum(): Promise<number> {
  const result: number = await apiClient.post("/api/chat/getGroupSeqNum");
  return result;
}

export async function createGroup(groupBasicInfo: GroupBasicInfo): Promise<GroupBasicInfo> {
  const result: GroupBasicInfo = await apiClient.post("/api/chat/createGroup", groupBasicInfo);
  return result;
}

export async function joinGroup(
  groupId: string,
  payment?: { paymentTxHash?: string },
): Promise<GroupBasicInfo> {
  const result: GroupBasicInfo = await apiClient.post("/api/chat/joinGroup", {
    groupId,
    paymentTxHash: payment?.paymentTxHash,
  });
  return result;
}

export async function sendGroupMessage(message: Message): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendGroupMessage", message);
  return result;
}

export async function syncGroupChatMessages(activeChatId: string): Promise<Message[]> {
  const result: Message[] = await apiClient.post("/api/chat/syncGroupChatMessages", {
    activeChatId: activeChatId,
  });
  return result;
}

export async function getGroupAllInfo(groupId: string): Promise<GroupAllInfo> {
  const result: GroupAllInfo = await apiClient.post("/api/chat/getGroupAllInfo", {
    groupId: groupId,
  });
  return result;
}

export async function updateGroupInfo(payload: {
  groupId: string;
  name?: string;
  groupIntro?: string;
  joinPrice?: string;
}): Promise<GroupBasicInfo> {
  const result: GroupBasicInfo = await apiClient.post("/api/chat/updateGroupInfo", payload);
  return result;
}

export async function leaveGroup(groupId: string): Promise<void> {
  await apiClient.post("/api/chat/leaveGroup", { groupId });
}

export async function kickMember(groupId: string, memberId: string): Promise<void> {
  await apiClient.post("/api/chat/kickMember", { groupId, memberId });
}

export async function dissolveGroup(groupId: string): Promise<void> {
  await apiClient.post("/api/chat/dissolveGroup", { groupId });
}

export async function sendRedPacket(
  message: Message,
  amount: number,
  isGroup: boolean,
  payment?: { paymentTxHashes?: string[]; paymentTxHash?: string },
): Promise<Message> {
  const result: Message = await apiClient.post("/api/chat/sendRedPacket", {
    ...message,
    amount,
    isGroup,
    paymentTxHashes: payment?.paymentTxHashes,
    paymentTxHash: payment?.paymentTxHash,
  });
  return result;
}

export async function getWallet(): Promise<WalletInfo> {
  const result: WalletInfo = await apiClient.post("/api/wallet/me");
  return result;
}
