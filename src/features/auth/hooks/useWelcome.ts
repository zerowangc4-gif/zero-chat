import { useApp } from "@/hooks";

export function useWelcome() {
  const { navigation, ROUTES, theme } = useApp();

  const handleSetupPassword = () => {
    navigation.navigate(ROUTES.SetupPassword);
  };

  // 跳转到登录页
  const handleLogin = () => {
    navigation.navigate(ROUTES.ReLogin);
  };

  return {
    handleSetupPassword,
    handleLogin,
    theme,
  };
}
