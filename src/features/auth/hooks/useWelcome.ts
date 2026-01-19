import { useApp } from "@/hooks";
export function useWelcome() {
  const { navigation, ROUTES, t } = useApp();
  const handleSetupPassword = () => {
    navigation.navigate(ROUTES.SetupPassword);
  };

  return {
    handleSetupPassword,
    t,
  };
}
