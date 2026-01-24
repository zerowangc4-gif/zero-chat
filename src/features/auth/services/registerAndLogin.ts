import { apiClient } from "@/api";
export async function registerAndLogin(address: string, publicKey: string, username: string) {
  const result = await apiClient.post("/api/auth/login", {
    address,
    publicKey,
    username,
  });
  return result;
}
