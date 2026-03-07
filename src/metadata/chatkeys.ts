// 维护用户和好友的最后一条信息的存储和状态
export function getLastMessageUserkey(userId: string): string {
  return `zeroChat:LastMessage:userId:${userId}`;
}
