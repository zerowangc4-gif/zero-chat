import { UserInfo } from "@/features/chat";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  userInfo: UserInfo;
  tokens: Tokens;
}
