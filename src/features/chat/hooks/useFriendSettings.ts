import { useApp } from "@/hooks";
export function useFriendSettings() {
  const { navigation } = useApp();
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };
  return { handleGoBack };
}
