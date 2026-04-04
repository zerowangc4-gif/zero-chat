import { Clipboard, ToastAndroid, Platform, Pressable } from "react-native";
import { BaseScreen, Main, Typography } from "@/components";
import { useAppSelector } from "@/store";

export function Me() {
  const { user } = useAppSelector(state => state.chat);

  const handleCopy = () => {
    Clipboard.setString(user.address);

    // 只在 Android 上显示原生黑底白字小提示
    if (Platform.OS === "android") {
      ToastAndroid.show("已复制地址", ToastAndroid.SHORT);
    }
    // iOS 逻辑：因为 iOS 系统没有内置 Toast，通常开发者会用自己的弹层
    // 如果你不想写组件，这里可以保持静默（用户其实能从系统的“已粘贴”气泡感知到）
  };

  return (
    <BaseScreen>
      <Main hasHeader={true}>
        <Pressable onPress={handleCopy} style={{ padding: 20 }}>
          <Typography style={{ fontSize: 16, color: "#333" }}>{user.address}</Typography>
          <Typography style={{ fontSize: 12, color: "#999", marginTop: 5 }}>点击复制</Typography>
        </Pressable>
      </Main>
    </BaseScreen>
  );
}
