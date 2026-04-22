import React from "react";
import styled, { css, useTheme } from "styled-components/native";
import { t } from "i18next";
import { useAppSelector } from "@/store";
import { Avatar, Typography } from "@/components";
import { useSocket } from "@/socket";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const AvatarWrapper = styled.View`
  ${({ theme }) => css`
    position: relative;
    width: ${theme.size.ms}px;
    height: ${theme.size.ms}px;
  `}
`;

const StatusDot = styled.View<{ $isConnected: boolean }>`
  ${({ theme, $isConnected }) => css`
    width: ${theme.typography.size.xs}px;
    height: ${theme.typography.size.xs}px;
    border-radius: ${theme.typography.size.xs / 2}px;
    background-color: ${$isConnected ? theme.palette.brand : theme.colors.secondaryWord};
    position: absolute;
    bottom: -1px;
    right: -1px;
    border-width: 2px;
    border-color: ${theme.colors.surfaceBg};
    z-index: 10;
  `}
`;

const UserText = styled.View`
  ${({ theme }) => css`
    margin-left: ${theme.spacing.step.sm}px;
  `}
`;

export function UserInfo() {
  const theme = useTheme();

  const { user } = useAppSelector(state => state.chat);

  const { isConnected } = useSocket();

  return (
    <Container>
      <AvatarWrapper>
        <Avatar avatarSeed={user.avatarSeed} size={theme.size.ms} />
        <StatusDot $isConnected={isConnected} />
      </AvatarWrapper>
      <UserText>
        <Typography type="main" weight="bold">
          {user.name}
        </Typography>
        <Typography type="caption" color={isConnected ? theme.palette.brand : theme.colors.secondaryWord}>
          {isConnected ? t("chat.Online") : t("chat.Offline")}
        </Typography>
      </UserText>
    </Container>
  );
}
