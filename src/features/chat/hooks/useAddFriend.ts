import { useEffect, useState } from "react";
import { useApp, useInput } from "@/hooks";
import { searchUserResult } from "../services";
import { UserInfo, addFriend } from "../store";
import { isValidEthereumAddress } from "@/utils";

export function useAddFriend() {
  const { navigation, dispatch, ROUTES, theme, t } = useApp();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const friendAddress = useInput("0xC9f61dbe994c0E32dcF12b1D14e42E8a662f6F3D");

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
    dispatch(addFriend(userInfo));

    navigation.replace(ROUTES.Chat, {
      address: userInfo.address,
      username: userInfo.username,
      avatarSeed: userInfo.avatarSeed,
      publicKey: userInfo.publicKey,
    });
  };

  return { navigation, theme, t, friendAddress, userInfo, loading, handleAddFriend };
}
