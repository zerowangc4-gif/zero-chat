import { Typography, BaseScreen, Avatar } from "@/components";
import { useSocket } from "@/socket";
import { useAppSelector } from "@/store";
import { Text } from "react-native";

export function ChatListScreen() {
  const { isConnected } = useSocket();
  const publicKey = useAppSelector(state => state.auth.user.publicKey);
  return (
    <BaseScreen>
      <Typography type="body">你好啊世界</Typography>
      <Text>Socket 状态: {isConnected ? "🟢 已连接" : "🔴 未连接"}</Text>
      <Avatar publicKey={publicKey} />
    </BaseScreen>
  );
}
