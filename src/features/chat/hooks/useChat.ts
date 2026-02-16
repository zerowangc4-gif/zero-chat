import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";

export function useChat() {
  const { route } = useApp<typeof ROUTES.Chat>();
  const { avatarSeed, username } = route.params;

  return {
    avatarSeed,
    username,
  };
}
