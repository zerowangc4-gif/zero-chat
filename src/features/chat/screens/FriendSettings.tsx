import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Header, ActionIcon } from "@/components";
import { useFriendSettings } from "../hooks";

import { Icon } from "@/constants";

export function FriendSettings() {
  const theme = useTheme();
  const { handleGoBack } = useFriendSettings();
  return (
    <BaseScreen>
      <Header
        leftElement={
          <ActionIcon
            name={Icon.back}
            size={theme.typography.size.lg}
            color={theme.colors.baseInverse}
            onPress={handleGoBack}
          />
        }
        title={t("chat.friend_settings")}
      />
    </BaseScreen>
  );
}
