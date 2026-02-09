import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useApp } from "@/hooks";
import { ROUTES } from "./routes";
import { MainTabParamList } from "./types";
import { Chats } from "@/features/chat";
import { Me } from "@/features/profile";
import { TabIcon } from "./helpers";

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  const { t, theme, insets } = useApp();
  const TAB_BAR_HEIGHT = theme.size.md + insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.word,
        tabBarLabelStyle: { fontSize: theme.typography.size.xs, marginTop: theme.spacing.step.sm },
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingTop: theme.spacing.step.xs,
          paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.step.xs,
          backgroundColor: theme.colors.base,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tab.Screen
        name={ROUTES.Chats}
        component={Chats}
        options={{
          tabBarLabel: t("tabs.chats"),
          tabBarIcon: TabIcon("gl-bubble"),
        }}
      />
      <Tab.Screen
        name={ROUTES.Me}
        component={Me}
        options={{
          tabBarLabel: t("tabs.me"),
          tabBarIcon: TabIcon("wode"),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
