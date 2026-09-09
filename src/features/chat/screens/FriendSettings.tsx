import { useTheme } from "styled-components/native";
import { t } from "i18next";
import styled, { css } from "styled-components/native";
import { BaseScreen, Header, ActionIcon, Main, Avatar, Typography, InfoRow, Button } from "@/components";
import { useFriendSettings } from "../hooks";
import { Icon } from "@/constants";

const ProfileBox = styled.View`
  ${({ theme }) => css`
    align-items: center;
    padding: ${theme.spacing.step.lg}px ${theme.spacing.step.md}px;
    background-color: ${theme.colors.base};
    gap: ${theme.spacing.step.sm}px;
  `}
`;

const ActionBox = styled.View`
  ${({ theme }) => css`
    padding: ${theme.spacing.step.md}px;
  `}
`;

export function FriendSettings() {
  const theme = useTheme();
  const { handleGoBack, friend, address, handleCopyAddress, handleOpenChat } = useFriendSettings();

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
      <Main hasHeader={true}>
        <ProfileBox>
          <Avatar avatarSeed={friend?.avatarSeed || "default_seed"} size={theme.size.lg} />
          <Typography type="main" weight="bold">
            {friend?.alias || friend?.name || address}
          </Typography>
        </ProfileBox>
        <InfoRow label={t("user.name")} value={friend?.name} isLink={false} />
        <InfoRow
          label={t("user.address")}
          value={address}
          isLink={false}
          onPress={handleCopyAddress}
        />
        <ActionBox>
          <Button title={t("chat.send_message")} bgColor={theme.palette.brand} onPress={handleOpenChat} />
        </ActionBox>
      </Main>
    </BaseScreen>
  );
}
