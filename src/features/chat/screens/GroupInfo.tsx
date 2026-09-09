import { useTheme } from "styled-components/native";
import { t } from "i18next";
import { ScrollView } from "react-native";
import styled, { css } from "styled-components/native";
import {
  BaseScreen,
  Header,
  ActionIcon,
  Main,
  InfoRow,
  HeaderTextAction,
  Typography,
  Avatar,
  Button,
} from "@/components";
import { useGroupInfo } from "../hooks";
import { Icon } from "@/constants";

const MemberRow = styled.Pressable`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    padding: ${theme.spacing.step.md}px;
    background-color: ${theme.colors.base};
    gap: ${theme.spacing.step.md}px;
  `}
`;

const MemberMeta = styled.View`
  flex: 1;
`;

const ActionBox = styled.View`
  ${({ theme }) => css`
    padding: ${theme.spacing.step.md}px;
    gap: ${theme.spacing.step.sm}px;
  `}
`;

const SectionTitle = styled.View`
  ${({ theme }) => css`
    padding: ${theme.spacing.step.sm}px ${theme.spacing.step.md}px;
  `}
`;

export function GroupInfo() {
  const theme = useTheme();
  const {
    handleGoBack,
    handleEditField,
    handleInvite,
    handleLeave,
    handleDissolve,
    handleKick,
    isOwner,
    loading,
    ownerName,
    adminNames,
    memberCount,
    joinPrice,
    members,
    groupBasicInfo,
  } = useGroupInfo();

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
        rightElement={<HeaderTextAction label={t("chat.invite_members")} onPress={handleInvite} />}
      />
      <Main hasHeader={true}>
        <ScrollView>
          <InfoRow
            label={t("chat.group_name")}
            value={groupBasicInfo?.name}
            isLink={isOwner}
            onPress={isOwner ? handleEditField("name") : undefined}
          />
          <InfoRow
            label={t("chat.group_intro")}
            value={groupBasicInfo?.groupIntro}
            isLink={isOwner}
            onPress={isOwner ? handleEditField("groupIntro") : undefined}
          />
          <InfoRow label={t("chat.groupOwner")} value={ownerName} isLink={false} />
          <InfoRow label={t("chat.groupAdmins")} value={adminNames} isLink={false} />
          <InfoRow
            label={t("chat.groupMembers")}
            value={String(memberCount)}
            isLink={false}
          />
          <InfoRow
            label={t("chat.join_price")}
            value={
              Number(joinPrice) > 0
                ? t("chat.join_price_value", { price: joinPrice, symbol: "USDC" })
                : t("chat.free_group")
            }
            isLink={false}
          />
          <SectionTitle>
            <Typography type="caption" color={theme.colors.secondaryWord}>
              {t("chat.member_list")}
            </Typography>
          </SectionTitle>
          {members.map(member => (
            <MemberRow key={member.address} onPress={handleKick(member)}>
              <Avatar avatarSeed={member.avatarSeed} size={theme.size.sm} />
              <MemberMeta>
                <Typography weight="bold">{member.name}</Typography>
                <Typography type="caption" color={theme.colors.secondaryWord} numberOfLines={1}>
                  {member.address}
                </Typography>
              </MemberMeta>
            </MemberRow>
          ))}
          <ActionBox>
            {isOwner ? (
              <Button
                title={t("chat.dissolve_group")}
                bgColor={theme.palette.error}
                disabled={loading}
                onPress={handleDissolve}
              />
            ) : (
              <Button title={t("chat.leave_group")} disabled={loading} onPress={handleLeave} />
            )}
          </ActionBox>
        </ScrollView>
      </Main>
    </BaseScreen>
  );
}
