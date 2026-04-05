import Clipboard from "@react-native-clipboard/clipboard";
import { useAppSelector } from "@/store";
import { Toast } from "@/components";

export function useMe() {
  const { user } = useAppSelector(state => state.chat);
  // 处理复制账号
  const handleCopyAdress = () => {
    Clipboard.setString(user.address);
    Toast.success("复制账号成功");
  };

  return { handleCopyAdress };
}
