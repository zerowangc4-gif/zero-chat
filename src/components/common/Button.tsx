import React from "react";
import { PressableProps, ActivityIndicator } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";

const ButtonContainer = styled.Pressable<{ $size: Size; $disabled: boolean; $block: boolean; $type: string }>`
  ${({ theme, $size, $block, $type }) => {
    const config = theme.presets.Button[$size];

    return css`
      height: ${config.height}px;
      border-radius: ${config.borderRadius}px;
      background-color: ${$type === "primary" ? theme.colors.primaryButtonBg : theme.colors.secondaryButtonBg};
      border-width: 1px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      align-self: ${$block ? "stretch" : "flex-start"};
      width: ${$block ? "100%" : "auto"};
    `;
  }}
`;
const ButtonContent = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;
const ButtonText = styled(Typography)<{
  $size: Size;
  $type: string;
}>`
  ${({ theme, $size, $type }) => {
    const config = theme.presets.Button[$size];

    return css`
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      color: ${$type === "primary" ? theme.colors.primaryButtonTextColor : theme.colors.secondaryButtonTextColor};
      font-weight: ${config.fontweight.semibold};
      include-font-padding: false;
      text-align-vertical: center;
    `;
  }}
`;

interface ButtonProps extends PressableProps {
  size?: Size;
  block?: boolean;
  title: string;
  loading?: boolean;
  type?: "primary" | "secondary";
}

export function Button({
  size = "md",
  title,
  block = false,
  disabled = false,
  loading = false,
  type = "primary",
  ...props
}: ButtonProps) {
  const theme = useTheme();

  return (
    <ButtonContainer
      {...props}
      $size={size}
      $type={type}
      $disabled={!!disabled}
      $block={block}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <ButtonContent>
        <ButtonText $type={type} $size={size}>
          {title}
        </ButtonText>

        {loading && <ActivityIndicator size="small" />}
      </ButtonContent>
    </ButtonContainer>
  );
}
