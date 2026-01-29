import { Typography, BaseScreen, Avatar } from "@/components";
import { useSocket } from "@/socket";
import { useAppSelector } from "@/store";
import { Text } from "react-native";

export function ChatListScreen() {
  const { isConnected } = useSocket();
  const { publicKey, username } = useAppSelector(state => state.auth.user);
  return (
    <BaseScreen>
      <Typography type="main">你好啊世界</Typography>
      <Text>{username}</Text>
      <Text>Socket 状态: {isConnected ? "🟢 已连接" : "🔴 未连接"}</Text>
      <Avatar publicKey={publicKey} />
    </BaseScreen>
  );
}
