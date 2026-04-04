import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import { setActiveChatId, UserInfo, Message, ChatSession } from "../store";

export function useChars() {
  const { dispatch, navigation, ROUTES } = useApp();

  const { friends, lastMessageMap } = useAppSelector(state => state.chat);

  // 好友列表
  const chatSessions: ChatSession[] = useMemo(() => {
    const currentLastMsgMap = lastMessageMap || {};

    return Object.values(friends || {})
      .map((item: UserInfo) => {
        const message: Message = currentLastMsgMap[item.address];
        return { ...item, lastMsg: message?.content || "", time: message?.timestamp || 0 };
      })
      .sort((sessionA, sessionB) => sessionB.time - sessionA.time);
  }, [friends, lastMessageMap]);

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

  return { handlePressItem, handleAddFriend, chatSessions };
}
