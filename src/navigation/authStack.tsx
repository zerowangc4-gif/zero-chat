import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import { Welcome, SetupPassword, BackupSecretQR, ReLogin, UnlockIdentity } from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator id="auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.Welcome} component={Welcome} />
      <Stack.Screen name={ROUTES.SetupPassword} component={SetupPassword} />
      <Stack.Screen name={ROUTES.BackupSecretQR} component={BackupSecretQR} />
      <Stack.Screen name={ROUTES.ReLogin} component={ReLogin} />
      <Stack.Screen name={ROUTES.UnlockIdentity} component={UnlockIdentity} />
    </Stack.Navigator>
  );
}
export default AuthStack;
