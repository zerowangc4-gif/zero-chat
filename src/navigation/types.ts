import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { ROUTES } from "./routes";

export type AuthStackParamList = {
  [ROUTES.Onboarding]: undefined;
  [ROUTES.CreateAccount]: undefined;
  [ROUTES.SeedPhraseDisplay]: undefined;
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

export type GlobalNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

declare module "@react-navigation/native" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface RootParamList extends RootStackParamList {}
}
