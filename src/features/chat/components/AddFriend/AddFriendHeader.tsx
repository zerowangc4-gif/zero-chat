import { ActionIcon, Header } from "@/components";
import { t } from "i18next";
import { useTheme } from "styled-components/native";
import { Icon } from "@/constants";
export function AddFriendHeader({ handleGoBack }) {
  const theme = useTheme();
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
      title={t("chat.add_friend")}
    />
  );
}
