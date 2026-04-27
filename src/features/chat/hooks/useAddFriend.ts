import { useEffect, useState } from "react";
import { t } from "i18next";
import { useApp, useInput } from "@/hooks";
import { Toast } from "@/components";
import { searchUserResult } from "../services";
import { UserInfo, setFriends } from "../store";
import { isValidEthereumAddress } from "@/utils";
import { useAppSelector } from "@/store";
import { addFriends } from "@/features/user";

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

  // 添加好友
  const handleAddFriend = async () => {
    try {
      if (!userInfo) return;

      const isExistingFriend = !!friends[userInfo.address];

      if (!isExistingFriend) {
        const result: UserInfo[] = await addFriends([userInfo.address]);

        if (result?.length > 0) {
          const friendInfos = result.map(item => ({
            ...item,
            alias: item.name,
            timestamp: Date.now(),
          }));
          dispatch(setFriends(friendInfos));
        }
      }
      navigation.replace(ROUTES.Chat, {
        address: userInfo.address,
      });
    } catch (err: unknown) {
      Toast.error(t("user.add_friend_error"));
      console.error(err);
    }
  };

  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  return { navigation, friendAddress, userInfo, loading, handleAddFriend, handleGoBack };
}
