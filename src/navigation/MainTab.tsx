import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "styled-components/native";
import { useTranslation } from "react-i18next";
import { ROUTES } from "./routes";
import { MainTabParamList } from "./types";
import { ChatListScreen } from "@/features/chat";
import { MeScreen } from "@/features/profile";
const Tab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTab() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        lazy: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.sub,
        tabBarIndicatorStyle: { height: 0 },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: theme.typography.size.xs, fontWeight: "bold" },
      }}>
      <Tab.Screen
        name={ROUTES.ChatList}
        component={ChatListScreen}
        options={{ tabBarLabel: t("tabs.chats") }}
      />
      <Tab.Screen name={ROUTES.Me} component={MeScreen} options={{ tabBarLabel: t("tabs.me") }} />
    </Tab.Navigator>
  );
}

export default MainTab;
