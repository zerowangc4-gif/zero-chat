import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Header, ActionIcon, Main } from "@/components";
import { useGroupInfo } from "../hooks";
import { GroupInfoItem } from "../components";
import { Icon } from "@/constants";

export function GroupInfo() {
  const theme = useTheme();
  const { handleGoBack, groupInfoConfigs } = useGroupInfo();
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
      <Main hasHeader={true}>
        {groupInfoConfigs.map(item => (
          <GroupInfoItem
            key={item.fieldKey}
            label={item.label}
            fieldKey={item.fieldKey}
            isLink={item.isLink}
            onPress={() => {}}
          />
        ))}
      </Main>
    </BaseScreen>
  );
}
