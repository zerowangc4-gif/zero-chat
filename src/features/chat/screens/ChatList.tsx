import { Typography, BaseScreen } from "@/components";
import { useSocket } from "@/socket";
import { Text } from "react-native";
export function ChatListScreen() {
  const { isConnected } = useSocket();
  return (
    <BaseScreen>
      <Typography type="body">你好啊世界</Typography>
      <Text>Socket 状态: {isConnected ? "🟢 已连接" : "🔴 未连接"}</Text>
    </BaseScreen>
  );
}
