import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import { setActiveChatId, UserInfo } from "@/features/chat";

export function useChars() {
  const { dispatch, navigation, ROUTES, theme, t } = useApp();
  const { avatarSeed, username, address } = useAppSelector(state => state.chat.user);
  console.log(address);
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

  return { avatarSeed, username, navigation, ROUTES, theme, t, handlePressItem, handleAddFriend };
}
