import { ActionIcon, Header } from "@/components";

export function ChatHeader({ theme, navigation, username }) {
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
