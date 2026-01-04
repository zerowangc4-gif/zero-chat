import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";
import { RootStackParamList } from "./types";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import renderPublicRoutes from "./PublicRoutes";
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name={ROUTES.MainTab} component={MainTab} />
            {renderPublicRoutes()}
          </>
        ) : (
          <Stack.Screen name={ROUTES.AuthStack} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
