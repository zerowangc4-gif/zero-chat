import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";

import { Chat, AddFriend, StartGroup, GroupSettings, CommonEditor } from "@/features/chat";

const Stack = createNativeStackNavigator();

function renderPublicRoutes() {
  return (
    <>
      <Stack.Screen
        name={ROUTES.Chat}
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.AddFriend}
        component={AddFriend}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.StartGroup}
        component={StartGroup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.GroupSettings}
        component={GroupSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.CommonEditor}
        component={CommonEditor}
        options={{
          headerShown: false,
        }}
      />
    </>
  );
}
export default renderPublicRoutes;
