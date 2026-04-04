import { useEffect, useState } from "react";
import { useApp, useInput } from "@/hooks";
import { searchUserResult } from "../services";
import { UserInfo, addFriends } from "../store";
import { isValidEthereumAddress } from "@/utils";

export function useAddFriend() {
  const { navigation, dispatch, ROUTES, theme, t } = useApp();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [loading, setLoading] = useState(false);
  const friendAddress = useInput("");

  //  当账号匹配的时候自动搜索用户信息
  useEffect(() => {
    const value = friendAddress.value.trim();

    if (!value || !isValidEthereumAddress(value)) {
      setUserInfo(null);
      return;
    }
    const handleUserInfo = async (address: string) => {
      setLoading(true);
      try {
        const result = await searchUserResult(address);
        setUserInfo(result);
      } catch (error) {
        setUserInfo(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleUserInfo(value);
  }, [friendAddress.value]);

  const handleAddFriend = () => {
    if (!userInfo) return;
    dispatch(addFriends([userInfo]));

    navigation.replace(ROUTES.Chat, {
      address: userInfo.address,
      username: userInfo.username,
      avatarSeed: userInfo.avatarSeed,
      publicKey: userInfo.publicKey,
    });
  };

  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  return { navigation, theme, t, friendAddress, userInfo, loading, handleAddFriend, handleGoBack };
}
