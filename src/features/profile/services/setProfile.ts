import { apiClient } from "@/api";
export async function updateAvatar(avatarSeed: string): Promise<string> {
  const result: string = await apiClient.post("/api/user/updateAvatar", {
    avatarSeed,
  });
  return result;
}
