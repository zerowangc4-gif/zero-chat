import { useApp } from "@/hooks";
import { useSocket } from "@/socket";
export function useWelcome() {
  const { navigation, ROUTES, t } = useApp();
  const { isConnected } = useSocket();
  const handleSetupPassword = () => {
    navigation.navigate(ROUTES.SetupPassword);
  };

  return {
    handleSetupPassword,
    t,
    isConnected,
  };
}
