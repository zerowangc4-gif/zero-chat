import { ActionIcon, Header } from "@/components";

export function AddFriendHeader({ theme, navigation, title }) {
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
      title={title}
    />
  );
}
