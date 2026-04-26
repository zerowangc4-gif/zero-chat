import { t } from "i18next";
import { ActionIcon, BaseScreen, Header, Main } from "@/components";
import { useProfile } from "../hooks";
import { Icon } from "@/constants";
import { useTheme } from "styled-components/native";
import { UserInfoItem } from "../components";

export function Profile() {
  const theme = useTheme();
  const { handleGoBack, handleItemPress, userInfoConfigs } = useProfile();

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
        title={t("user.profile")}
      />
      <Main hasHeader={true}>
        {userInfoConfigs.map(item => (
          <UserInfoItem
            key={item.fieldKey}
            label={item.label}
            fieldKey={item.fieldKey}
            isLink={item.isLink}
            onPress={handleItemPress(item.fieldKey)}
          />
        ))}
      </Main>
    </BaseScreen>
  );
}
