import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";

import { ChatScreen } from "@/features/chat";

const Stack = createNativeStackNavigator();

function renderPublicRoutes() {
  return (
    <>
      <Stack.Screen
        name={ROUTES.Chat}
        component={ChatScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "对话",
        }}
      />
    </>
  );
}
export default renderPublicRoutes;
