import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";
import { RootStackParamList } from "./types";
import AuthStack from "./authStack";
import MainTab from "./mainTab";
import renderPublicRoutes from "./publicRoutes";
import { useAppSelector } from "@/store";
import { SocketProvider } from "@/socket";
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const token = useAppSelector(state => state.auth.accessToken);
  const isLoggedIn = !!token;
  return (
    <SocketProvider token={token}>
      <NavigationContainer>
        <Stack.Navigator id="root" screenOptions={{ headerShown: false }}>
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
    </SocketProvider>
  );
}
