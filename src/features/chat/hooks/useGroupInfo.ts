import { useApp } from "@/hooks";
export function useGroupInfo() {
  const { navigation } = useApp();
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };
  return { handleGoBack };
}
