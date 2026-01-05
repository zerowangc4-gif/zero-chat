export const ROUTES = {
  // 认证流
  AuthStack: "AuthStack",
  Onboarding: "Onboarding",
  CreateAccount: "CreateAccount",
  SeedPhraseDisplay: "SeedPhraseDisplay",
  // 主页滑动 Tab
  MainTab: "MainTab",
  ChatList: "ChatList",
  Me: "Me",

  // 全局
  Chat: "Chat",
} as const;

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES];
