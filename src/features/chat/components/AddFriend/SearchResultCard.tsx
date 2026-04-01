import React from "react";
import styled, { css } from "styled-components/native";
import { Avatar, Typography, Button } from "@/components";

const Container = styled.View`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.surfaceBg};
      border-radius: ${theme.radii.scale.xl}px;
      padding-left: ${theme.spacing.step.lg}px;
      padding-right: ${theme.spacing.step.lg}px;
      padding-top: ${theme.spacing.step.md}px;
      padding-bottom: ${theme.spacing.step.xl}px;
      ${theme.shadows.low}
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

export function SearchResultCard({ theme, userInfo, title, onPress }) {
  if (!userInfo) return null;

  return (
    <Container>
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
        <Button title={title} bgColor={theme.colors.baseInverse} onPress={onPress} />
      </ActionButtonWrapper>
    </Container>
  );
}
