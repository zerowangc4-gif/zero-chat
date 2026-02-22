import { apiClient } from "@/api";
export async function getContacts() {
  const result = await apiClient.get("/api/user/getContacts");
  return result;
}
