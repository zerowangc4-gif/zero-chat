import Clipboard from "@react-native-clipboard/clipboard";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Toast, OverlayLayer } from "@/components";
import { Icon } from "@/constants";
import { useApp } from "@/hooks";
import { LogOut } from "../store";
import { getWallet, setWallet } from "@/features/chat";
import { getBaseWalletBalances } from "@/features/wallet";

export function useMe() {
  const { dispatch, navigation, ROUTES } = useApp();
  const { user, wallet } = useAppSelector(state => state.chat);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      OverlayLayer.hide();
    };
  }, []);

  const loadWallet = useCallback(async () => {
    try {
      const serverWallet = await getWallet();
      let onChain = serverWallet;
      try {
        const balances = await getBaseWalletBalances(user.address || serverWallet.address);
        onChain = {
          ...serverWallet,
          balance: balances.balance,
          ethBalance: balances.ethBalance,
          tokenSymbol: balances.tokenSymbol,
          chain: balances.chain,
        };
      } catch (err) {
        console.error(err);
      }
      dispatch(setWallet(onChain));
    } catch (err: unknown) {
      console.error(err);
    }
  }, [dispatch, user.address]);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  const handleShowMeMenu = () => {
    setMenuVisible(true);
    OverlayLayer.show(() => {
      setMenuVisible(false);
    });
  };

  const handleCopyAdress = () => {
    Clipboard.setString(user.address);
    Toast.success(t("user.copy_account_sucess_toast"));
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  const handleLogOut = () => {
    dispatch(LogOut());
  };

  const menuItems = [
    { iconName: Icon.copy, text: t("user.copy_id"), onPress: handleCopyAdress },
    { iconName: Icon.logOut, text: t("user.log_out"), onPress: handleLogOut },
  ];

  const handleGoProfile = () => {
    navigation.navigate(ROUTES.Profile);
  };

  return {
    handleShowMeMenu,
    isMenuVisible,
    menuItems,
    handleGoProfile,
    handleCopyAdress,
    user,
    wallet,
  };
}
