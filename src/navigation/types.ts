// src/navigation/types.ts
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";

// 各个 Stack 的参数列表
export type AuthStackParamList = {
  [ROUTES.Onboarding]: undefined;
  [ROUTES.CreateAccount]: undefined;
  [ROUTES.SeedPhraseDisplay]: { mnemonic: string };
  [ROUTES.SeedPhraseConfirm]: undefined;
};

export type MainTabParamList = {
  [ROUTES.ChatList]: undefined;
  [ROUTES.Me]: undefined;
};

export type RootStackParamList = {
  [ROUTES.AuthStack]: NavigatorScreenParams<AuthStackParamList>;
  [ROUTES.MainTab]: NavigatorScreenParams<MainTabParamList>;
  [ROUTES.Chat]: { chatId: string; title: string };
};

// 平铺所有路由，用于全局导航提示
export type AllParamList = RootStackParamList & AuthStackParamList & MainTabParamList;

// 导出全 App 通用的导航 Prop 类型
export type AppNavigationProp = NativeStackNavigationProp<AllParamList>;

// 导出自定义 Hook，页面内直接使用这个即可解决 never 报错
export const useAppNavigation = () => useNavigation<AppNavigationProp>();
