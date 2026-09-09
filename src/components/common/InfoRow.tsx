import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "./Typography";
import { Avatar } from "./Avatar";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: ${theme.colors.surfaceBg};
    `;
  }}
`;

const Label = styled.View`
  ${({ theme }) => {
    return css`
      padding: ${theme.spacing.step.md}px;
    `;
  }}
`;

const ValueWrapper = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      flex-direction: row;
      justify-content: flex-end;
      padding-right: ${theme.spacing.step.xs}px;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;

const IconWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding: ${theme.spacing.step.md}px;
    `;
  }}
`;

interface Props {
  label: string;
  value?: string;
  isAvatar?: boolean;
  isLink?: boolean;
  onPress?: () => void;
}

export function InfoRow({ label, value, isAvatar, isLink = true, onPress }: Props) {
  const theme = useTheme();

  return (
    <Container
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
      })}>
      <Label>
        <Typography weight="bold">{label}</Typography>
      </Label>
      <ValueWrapper>
        {isAvatar ? (
          <Avatar avatarSeed={value || "default_seed"} size={theme.size.xs} />
        ) : (
          <Typography numberOfLines={1} ellipsizeMode="middle" color={theme.colors.secondaryWord}>
            {value}
          </Typography>
        )}
      </ValueWrapper>
      <IconWrapper>
        <IconFont
          name={isLink ? Icon.go : Icon.copy}
          size={theme.typography.size.md}
          color={theme.colors.secondaryWord}
        />
      </IconWrapper>
    </Container>
  );
}
