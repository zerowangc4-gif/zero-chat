import React from "react";
import { PressableProps, ActivityIndicator } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";

type ButtonType = "primary" | "secondary";

const ButtonContainer = styled.Pressable<{ $size: Size; $disabled: boolean; $block: boolean; $type: ButtonType }>`
  ${({ theme, $size, $disabled, $block, $type }) => {
    const config = theme.presets.Button[$size];
    const getBgColor = () => {
      if ($disabled) return theme.colors.buttonDisabled;
      return $type === "primary" ? theme.colors.primary : theme.colors.secondaryBg;
    };
    return css`
      height: ${config.height}px;
      border-radius: ${config.borderRadius}px;
      background-color: ${getBgColor()};
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
  $disabled: boolean;
  $type: ButtonType;
}>`
  ${({ theme, $size, $disabled, $type }) => {
    const config = theme.presets.Button[$size];
    const getTextColor = () => {
      if ($disabled) return theme.colors.buttonTextDisabled;
      return $type === "primary" ? theme.colors.textInverse : theme.colors.secondaryButtonText;
    };

    return css`
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      color: ${getTextColor()};
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
  type?: ButtonType;
  loading?: boolean;
}

export function Button({
  size = "md",
  title,
  block = false,
  disabled = false,
  type = "primary",
  loading = false,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = !!disabled || loading;
  const loaderColor = type === "primary" ? theme.colors.textInverse : theme.colors.primary;
  return (
    <ButtonContainer
      {...props}
      $size={size}
      $disabled={!!disabled}
      $block={block}
      disabled={disabled}
      $type={type}
      style={({ pressed }) => ({
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <ButtonContent>
        <ButtonText $size={size} $disabled={isDisabled} $type={type}>
          {title}
        </ButtonText>

        {loading && <ActivityIndicator color={loaderColor} size="small" />}
      </ButtonContent>
    </ButtonContainer>
  );
}
