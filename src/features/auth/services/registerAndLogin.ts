import { apiClient } from "@/api";

export async function getNonce(address: string) {
  const result = await apiClient.post("/api/auth/getNonce", {
    address,
  });
  return result;
}
export async function registerAndLogin(address: string, publicKey: string, username: string, signature: string) {
  const result = await apiClient.post("/api/auth/login", {
    address,
    publicKey,
    username,
    signature,
  });
  return result;
}
