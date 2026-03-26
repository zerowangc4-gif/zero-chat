import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import { setActiveChatId } from "@/features/chat";

export function useChars() {
  const { dispatch, navigation, ROUTES, theme } = useApp();
  const { avatarSeed, username } = useAppSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(setActiveChatId(""));
  }, [dispatch]);

  return { avatarSeed, username, navigation, ROUTES, theme };
}
