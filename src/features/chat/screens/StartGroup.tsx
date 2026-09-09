import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Header, Main, ActionIcon } from "@/components";
import { Icon } from "@/constants";
import { FriendList, GroupMembers, StartGroupRightAction } from "../components";
import { useStartGroup } from "../hooks";

export function StartGroup() {
  const theme = useTheme();
  const { handleGoBack, groupMembers, handleSelectGroupMember, handleGoGroupSettings, mode } = useStartGroup();
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
        title={mode === "invite" ? t("chat.invite_members") : t("chat.start_group")}
        rightElement={
          Object.values(groupMembers || {}).length > 0 && (
            <StartGroupRightAction
              handleGoGroupSettings={handleGoGroupSettings}
              label={mode === "invite" ? t("chat.invite_members") : t("chat.next")}
            />
          )
        }
      />
      <Main hasHeader={true}>
        <GroupMembers groupMembers={groupMembers} handleSelectGroupMember={handleSelectGroupMember} />
        <FriendList groupMembers={groupMembers} handleSelectGroupMember={handleSelectGroupMember} />
      </Main>
    </BaseScreen>
  );
}
