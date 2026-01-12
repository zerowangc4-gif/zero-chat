import { useApp } from "@/hooks";
export function useOnboarding() {
  const { navigation, ROUTES, t } = useApp();
  const handleCreateAccount = () => {
    navigation.navigate(ROUTES.CreateAccount);
  };

  return {
    handleCreateAccount,
    t,
  };
}
