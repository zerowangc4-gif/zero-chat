import { useTheme } from "styled-components/native";
import { ActionIcon, Header } from "@/components";
import { useAppRoute, ROUTES } from "@/navigation";
import { Icon } from "@/constants";
interface Props {
  handleGoBack: () => void;
}
export function ChatHeader({ handleGoBack }: Props) {
  const theme = useTheme();
  const route = useAppRoute<typeof ROUTES.Chat>();
  const { username } = route.params;

  return (
    <Header
      leftElement={
        <ActionIcon
          size={theme.typography.size.lg}
          color={theme.colors.baseInverse}
          onPress={handleGoBack}
          name={Icon.back}
        />
      }
      title={username}
      rightElement={<ActionIcon size={theme.typography.size.lg} color={theme.colors.baseInverse} name={Icon.check} />}
    />
  );
}
