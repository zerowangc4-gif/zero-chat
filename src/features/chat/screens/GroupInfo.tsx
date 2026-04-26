import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Header, ActionIcon } from "@/components";
import { useGroupInfo } from "../hooks";

import { Icon } from "@/constants";

export function GroupInfo() {
  const theme = useTheme();
  const { handleGoBack } = useGroupInfo();
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
        title={t("chat.group_detail")}
      />
    </BaseScreen>
  );
}
