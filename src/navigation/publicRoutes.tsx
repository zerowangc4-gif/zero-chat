import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";

import { Chat, AddFriend } from "@/features/chat";

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
    </>
  );
}
export default renderPublicRoutes;
