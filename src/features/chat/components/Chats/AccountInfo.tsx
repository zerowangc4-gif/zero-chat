import React from "react";
import styled, { css, useTheme } from "styled-components/native";
import { t } from "i18next";
import { useAppSelector } from "@/store";
import { Avatar, Typography } from "@/components";
import { useSocket } from "@/socket";

const STATUS_DOT_SIZE = 12;

const AccountInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const AvatarContent = styled.View`
  ${({ theme }) => css`
    position: relative;
    width: ${theme.size.ms}px;
    height: ${theme.size.ms}px;
    margin-right: ${theme.spacing.step.sm}px;
  `}
`;
const StatusDot = styled.View<{ $isConnected: boolean }>`
  ${({ theme, $isConnected }) => css`
    width: ${STATUS_DOT_SIZE}px;
    height: ${STATUS_DOT_SIZE}px;
    border-radius: ${STATUS_DOT_SIZE / 2}px;
    background-color: ${$isConnected ? theme.palette.brand : theme.colors.secondaryWord};
    position: absolute;
    bottom: -1px;
    right: -1px;
    border-width: 2px;
    border-color: ${theme.colors.surfaceBg};
    z-index: 10;
  `}
`;
const InfoContent = styled.View`
  ${({ theme }) => css`
    gap: ${theme.spacing.step.xs}px;
  `}
`;

export function AccountInfo() {
  const theme = useTheme();

  const { user } = useAppSelector(state => state.chat);

  const { isConnected } = useSocket();

  return (
    <AccountInfoContainer>
      <AvatarContent>
        <Avatar avatarSeed={user.avatarSeed} size={theme.size.ms} />
        <StatusDot $isConnected={isConnected} />
      </AvatarContent>
      <InfoContent>
        <Typography type="main" weight="bold">
          {user.username}
        </Typography>
        <Typography type="caption" color={isConnected ? theme.palette.brand : theme.colors.secondaryWord}>
          {isConnected ? t("chat.Online") : t("chat.Offline")}
        </Typography>
      </InfoContent>
    </AccountInfoContainer>
  );
}
