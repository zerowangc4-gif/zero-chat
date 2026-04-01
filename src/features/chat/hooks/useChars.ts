import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import { setActiveChatId, UserInfo, Message, ChatSession } from "@/features/chat";

export function useChars() {
  const { dispatch, navigation, ROUTES, theme, t } = useApp();
  const { user, friends, chatMap } = useAppSelector(state => state.chat);

  // 好友列表
  const chatSessions: ChatSession[] = useMemo(() => {
    return Object.values(friends || {})
      .map((item: UserInfo) => {
        const messages: Message[] = chatMap[item.address];
        if (messages && messages.length) {
          const message = messages[0];
          return { ...item, lastMsg: message.content, time: message.timestamp };
        }
        return { ...item, lastMsg: "", time: 0 };
      })
      .sort((sessionA, sessionB) => sessionB.time - sessionA.time);
  }, [friends, chatMap]);

  //  跳转到聊天页面
  const handlePressItem = (item: UserInfo) => () => {
    navigation.navigate(ROUTES.Chat, {
      address: item.address,
      username: item.username,
      avatarSeed: item.avatarSeed,
      publicKey: item.publicKey,
    });
  };

  //  跳转到加好友页面
  const handleAddFriend = () => {
    navigation.navigate(ROUTES.AddFriend);
  };

  useEffect(() => {
    dispatch(setActiveChatId(""));
  }, [dispatch]);

  return { user, navigation, ROUTES, theme, t, handlePressItem, handleAddFriend, chatSessions };
}
