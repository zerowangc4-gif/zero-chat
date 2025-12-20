import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import { SignInScreen, SignUpScreen, ResetPasswordScreen } from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.SignIn} component={SignInScreen} />
      <Stack.Screen name={ROUTES.SignUp} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.ResetPassword} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
