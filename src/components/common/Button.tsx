import React from "react";
import { PressableProps, ActivityIndicator } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";

const ButtonContainer = styled.Pressable<{ $size: Size; $disabled: boolean; $block: boolean; $type: string }>`
  ${({ theme, $size, $block, $type, $disabled }) => {
    const config = theme.presets.Button[$size];
    const bg = $disabled
      ? theme.colors.disableButtonBg
      : $type === "primary"
        ? theme.colors.primaryButtonBg
        : theme.colors.secondaryButtonBg;
    return css`
      height: ${config.height}px;
      border-radius: ${config.borderRadius}px;
      background-color: ${bg};
      border-width: ${$type === "primary" ? 0 : 1}px;
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
  $disabled: boolean;
}>`
  ${({ theme, $size, $type, $disabled }) => {
    const config = theme.presets.Button[$size];
    const color = $disabled
      ? theme.colors.disableButtonTextColor
      : $type === "primary"
        ? theme.colors.primaryButtonTextColor
        : theme.colors.secondaryButtonTextColor;

    return css`
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      color: ${color};
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
        <ButtonText $type={type} $size={size} $disabled={!!disabled}>
          {title}
        </ButtonText>

        {loading && <ActivityIndicator size="small" />}
      </ButtonContent>
    </ButtonContainer>
  );
}
