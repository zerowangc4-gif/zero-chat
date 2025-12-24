import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import { LoginScreen, OTPVerifyScreen } from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
      <Stack.Screen name={ROUTES.OTPVerify} component={OTPVerifyScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
