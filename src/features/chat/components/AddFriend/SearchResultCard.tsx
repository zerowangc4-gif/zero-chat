import React from "react";
import styled, { css, useTheme } from "styled-components/native";
import { Avatar, Typography, Button } from "@/components";
import { t } from "i18next";
import { UserInfo } from "../../store";
const Container = styled.View`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.surfaceBg};
      border-radius: ${theme.radii.scale.xl}px;
      padding-left: ${theme.spacing.step.lg}px;
      padding-right: ${theme.spacing.step.lg}px;
      padding-top: ${theme.spacing.step.md}px;
      padding-bottom: ${theme.spacing.step.xl}px;
    `;
  }}
`;

const AvatarWrapper = styled.View`
  ${({ theme }) => {
    return css`
      align-items: center;
      padding-bottom: ${theme.spacing.step.md}px;
    `;
  }}
`;

const UserInfoWrapper = styled.View`
  ${({ theme }) => {
    return css`
      align-items: center;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;

const ActionButtonWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.spacing.step.xl}px;
    `;
  }}
`;

interface Props {
  userInfo: UserInfo | null;
  handleAddFriend: () => void;
}
export function SearchResultCard({ userInfo, handleAddFriend }: Props) {
  const theme = useTheme();

  if (!userInfo) return null;

  return (
    <Container style={theme.shadows.low}>
      <AvatarWrapper>
        <Avatar avatarSeed={userInfo.avatarSeed} size={theme.size.lg} />
      </AvatarWrapper>
      <UserInfoWrapper>
        <Typography weight="bold">{userInfo.username}</Typography>

        <Typography type="caption" color={theme.colors.secondaryWord} numberOfLines={1} ellipsizeMode="middle">
          {userInfo.address}
        </Typography>
      </UserInfoWrapper>
      <ActionButtonWrapper>
        <Button title={t("chat.add_friend")} bgColor={theme.colors.baseInverse} onPress={handleAddFriend} />
      </ActionButtonWrapper>
    </Container>
  );
}
