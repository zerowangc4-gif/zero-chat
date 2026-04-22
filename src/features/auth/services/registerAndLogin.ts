import { apiClient } from "@/api";

export async function getNonce(address: string): Promise<string> {
  const result: string = await apiClient.post("/api/auth/getNonce", {
    address,
  });
  return result;
}
export async function registerAndLogin(address: string, publicKey: string, name: string, signature: string) {
  const result = await apiClient.post("/api/auth/registerAndLogin", {
    address,
    signature,
    publicKey,
    name,
  });
  return result;
}
