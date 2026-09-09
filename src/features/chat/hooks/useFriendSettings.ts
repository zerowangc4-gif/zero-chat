import Clipboard from "@react-native-clipboard/clipboard";
import { useMemo } from "react";
import { t } from "i18next";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { Toast } from "@/components";

export function useFriendSettings() {
  const { navigation, route, ROUTES } = useApp();
  const { address } = route.params;
  const { friends } = useAppSelector(state => state.chat);

  const friend = useMemo(() => friends[address], [friends, address]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCopyAddress = () => {
    Clipboard.setString(address);
    Toast.success(t("user.copy_account_sucess_toast"));
  };

  const handleOpenChat = () => {
    navigation.navigate(ROUTES.Chat, { address });
  };

  return { handleGoBack, friend, address, handleCopyAddress, handleOpenChat };
}
