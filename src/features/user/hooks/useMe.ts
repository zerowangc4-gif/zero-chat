import Clipboard from "@react-native-clipboard/clipboard";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Toast, OverlayLayer } from "@/components";
import { setTokens } from "@/features/auth";
import { Icon } from "@/constants";
import { useApp } from "@/hooks";

export function useMe() {
  const { dispatch } = useApp();
  const { user } = useAppSelector(state => state.chat);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  //  页面卸载的时候关闭遮罩层
  useEffect(() => {
    return () => {
      OverlayLayer.hide();
    };
  }, []);

  //打开遮罩层，和菜单
  const handleShowMeMenu = () => {
    setMenuVisible(true);
    OverlayLayer.show(() => {
      setMenuVisible(false);
    });
  };
  // 处理复制账号
  const handleCopyAdress = () => {
    Clipboard.setString(user.address);
    Toast.success(t("user.copy_account_sucess_toast"));
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  // 退出登录
  const handleLogOut = () => {
    dispatch(setTokens({ accessToken: "", refreshToken: "" }));
  };

  // 菜单数据
  const menuItems = [
    { iconName: Icon.copy, text: t("user.copy_id"), onPress: handleCopyAdress },
    { iconName: Icon.logOut, text: t("user.log_out"), onPress: handleLogOut },
  ];

  return { handleShowMeMenu, isMenuVisible, menuItems };
}
