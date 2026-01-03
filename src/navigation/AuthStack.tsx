import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "./routes";
import {
  OnboardingScreen,
  CreateAccountScreen,
  SeedPhraseDisplayScreen,
  SeedPhraseConfirmScreen,
} from "@/features/auth";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.Onboarding} component={OnboardingScreen} />
      <Stack.Screen name={ROUTES.CreateAccount} component={CreateAccountScreen} />
      <Stack.Screen name={ROUTES.SeedPhraseDisplay} component={SeedPhraseDisplayScreen} />
      <Stack.Screen name={ROUTES.SeedPhraseConfirm} component={SeedPhraseConfirmScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
