import { Typography, BaseScreen, Avatar } from "@/components";
import { useSocket } from "@/socket";
import { useAppSelector } from "@/store";
import { Text } from "react-native";

export function ChatListScreen() {
  const { isConnected } = useSocket();
  const { user, accessToken, refreshToken } = useAppSelector(state => state.auth);
  console.log(user);
  console.log(accessToken, refreshToken);
  return (
    <BaseScreen>
      <Typography type="main">你好啊世界</Typography>
      <Text>id:{user.id}</Text>
      <Text>username:{user.username}</Text>
      <Text>publicKey:{user.publicKey}</Text>
      <Text>address:{user.address}</Text>
      <Text>publicKey:{user.publicKey}</Text>
      <Text>accessToken:{accessToken}</Text>
      <Text>refreshToken:{refreshToken}</Text>
      <Text>Socket 状态: {isConnected ? "🟢 已连接" : "🔴 未连接"}</Text>
      <Avatar publicKey={user.publicKey} />
    </BaseScreen>
  );
}
