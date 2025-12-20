import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import { SignInScreen, SignUpScreen, ResetPasswordScreen } from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text.main,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}>
      <Stack.Screen name={ROUTES.SignIn} component={SignInScreen} options={{ title: "登录" }} />
      <Stack.Screen name={ROUTES.SignUp} component={SignUpScreen} options={{ title: "登录" }} />
      <Stack.Screen
        name={ROUTES.ResetPassword}
        component={ResetPasswordScreen}
        options={{ title: "登录" }}
      />
    </Stack.Navigator>
  );
}
export default AuthStack;
