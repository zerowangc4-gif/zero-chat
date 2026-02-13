import React from "react";
import styled, { css } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { useChars } from "@/features/chat";
import { useSocket } from "@/socket";
import { useApp } from "@/hooks";

const STATUS_DOT_SIZE = 12;

export type SizeType = "small" | "normal" | "medium" | "large";

export const size = { small: 35, normal: 40, medium: 56, large: 80 };

export interface AccountInfoProps {
  type: SizeType;
}
const AccountInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const AvatarContent = styled.View`
  ${({ theme }) => css`
    position: relative;
    width: ${size.normal}px;
    height: ${size.normal}px;
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

export function AccountInfo(props: AccountInfoProps) {
  const { theme, t } = useApp();
  const { publicKey, username } = useChars();
  const { isConnected } = useSocket();

  return (
    <AccountInfoContainer>
      <AvatarContent>
        <Avatar publicKey={publicKey} size={size[props.type]} />
        <StatusDot $isConnected={isConnected} />
      </AvatarContent>
      <InfoContent>
        <Typography type="main" weight="bold">
          {username}
        </Typography>
        <Typography type="caption" color={isConnected ? theme.palette.brand : theme.colors.secondaryWord}>
          {isConnected ? t("chat.Online") : t("chat.Offline")}
        </Typography>
      </InfoContent>
    </AccountInfoContainer>
  );
}
