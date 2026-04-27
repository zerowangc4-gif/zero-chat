import { apiClient } from "@/api";
import { UserInfo } from "@/features/chat";

export async function addFriends(ids: string[]): Promise<UserInfo[]> {
  const result: UserInfo[] = await apiClient.post("/api/user/addFriends", {
    ids: ids,
  });
  return result;
}

export async function getAllFriendInfo(): Promise<UserInfo[]> {
  const result: UserInfo[] = await apiClient.post("/api/user/getAllFriendInfo");
  return result;
}

export async function updateUserInfo(userInfo: UserInfo): Promise<UserInfo> {
  const result: UserInfo = await apiClient.post("/api/user/updateUserInfo", userInfo);
  return result;
}
