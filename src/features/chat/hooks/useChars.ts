import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import { fetchContacts, Message } from "@/features/chat";

export function useChars() {
  const { dispatch, navigation, ROUTES, theme } = useApp();
  const { avatarSeed, username } = useAppSelector(state => state.auth.user);
  const { contacts, chatMap } = useAppSelector(state => state.chat);
  const recentChats = (contacts || []).map(user => {
    const messages: Message[] = chatMap?.[user.address];
    const lastMessage: Message = messages && messages.length > 0 ? messages[0] : null;

    return {
      ...user,
      lastMsg: lastMessage?.content,
      time: lastMessage?.timestamp,
    };
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return { avatarSeed, username, recentChats, navigation, ROUTES, theme };
}
