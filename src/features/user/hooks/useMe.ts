import Clipboard from "@react-native-clipboard/clipboard";
import { useAppSelector } from "@/store";
import { Toast } from "@/components";
import { t } from "i18next";

export function useMe() {
  const { user } = useAppSelector(state => state.chat);
  // 处理复制账号
  const handleCopyAdress = () => {
    Clipboard.setString(user.address);
    Toast.success(t("user.copy_account_sucess_toast"));
  };

  return { handleCopyAdress };
}
