// src/navigation/types.ts
import { NavigatorScreenParams, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";

export type AuthStackParamList = {
  [ROUTES.Welcome]: undefined;
  [ROUTES.SetupPassword]: undefined;
  [ROUTES.BackupSecretQR]: { mnemonic: string; address: string; publicKey: string; username: string; password: string };
};

export type MainTabParamList = {
  [ROUTES.Chats]: undefined;
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

export const useAppRoute = <T extends keyof AllParamList = keyof AllParamList>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRoute<RouteProp<AllParamList, T>>() as any as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: Partial<AllParamList[T]> & Record<string, any>;
  };
