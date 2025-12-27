import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { ROUTES } from "./routes";
import { MainTabParamList } from "./types";
import { ChatListScreen } from "@/features/chat";
import { MeScreen } from "@/features/profile";
const Tab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTab() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        lazy: true,
      }}>
      <Tab.Screen name={ROUTES.ChatList} component={ChatListScreen} options={{ tabBarLabel: t("tabs.chats") }} />
      <Tab.Screen name={ROUTES.Me} component={MeScreen} options={{ tabBarLabel: t("tabs.me") }} />
    </Tab.Navigator>
  );
}

export default MainTab;
