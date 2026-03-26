export interface User {
  address: string;
  publicKey: string;
  username: string;
  avatarSeed: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface TokensType {
  accessToken: string;
  refreshToken: string;
}

export interface LoginInfo {
  address: string;
  publicKey: string;
  username: string;
  uri: string;
}
