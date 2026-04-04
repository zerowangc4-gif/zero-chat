import { useEffect, useState } from "react";
import { useApp, useInput } from "@/hooks";
import { searchUserResult } from "../services";
import { UserInfo, addFriends } from "../store";
import { isValidEthereumAddress } from "@/utils";
import { useAppSelector } from "@/store";
export function useAddFriend() {
  const { navigation, dispatch, ROUTES } = useApp();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { user, friends } = useAppSelector(state => state.chat);

  const [loading, setLoading] = useState(false);

  const friendAddress = useInput("");

  //  当账号匹配的时候自动搜索用户信息
  useEffect(() => {
    const value = friendAddress.value.trim();

    if (!value || !isValidEthereumAddress(value) || value === user.address) {
      setUserInfo(null);
      return;
    }

    if (friends[value]) {
      setUserInfo(friends[value]);
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
  }, [friendAddress.value, friends, user.address]);

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

  return { navigation, friendAddress, userInfo, loading, handleAddFriend, handleGoBack };
}
