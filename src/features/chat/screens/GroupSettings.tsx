import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Header, Main, ActionIcon } from "@/components";
import { useGroupSettings } from "../hooks";
import { Icon } from "@/constants";

export function GroupSettings() {
  const theme = useTheme();
  const { handleGoBack } = useGroupSettings();
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
        title={t("chat.group_settings")}
      />
      <Main hasHeader={true} />
    </BaseScreen>
  );
}
