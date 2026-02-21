import { ActionIcon, Header } from "@/components";
import { useChat } from "@/features/chat";
import { useApp } from "@/hooks";
export function ChatHeader() {
  const { theme, navigation } = useApp();
  const { username } = useChat();
  return (
    <Header
      leftElement={
        <ActionIcon
          size={theme.typography.size.lg}
          color={theme.colors.baseInverse}
          onPress={navigation.goBack}
          name="fanhui1"
        />
      }
      title={username}
      rightElement={
        <ActionIcon size={theme.typography.size.lg} color={theme.colors.baseInverse} name="sangediandian" />
      }
    />
  );
}
