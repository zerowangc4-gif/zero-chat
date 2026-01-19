import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import { Welcome, SetupPassword, BackupSecretQR } from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.Welcome} component={Welcome} />
      <Stack.Screen name={ROUTES.SetupPassword} component={SetupPassword} />
      <Stack.Screen name={ROUTES.BackupSecretQR} component={BackupSecretQR} />
    </Stack.Navigator>
  );
}
export default AuthStack;
