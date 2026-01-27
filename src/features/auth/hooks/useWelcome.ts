import { useApp } from "@/hooks";

export function useWelcome() {
  const { navigation, ROUTES, t, theme } = useApp();

  const handleSetupPassword = () => {
    navigation.navigate(ROUTES.SetupPassword);
  };

  return {
    handleSetupPassword,
    t,
    theme,
  };
}
