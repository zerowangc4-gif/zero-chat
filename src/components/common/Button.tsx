import React from "react";
import { PressableProps } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";

type ButtonType = "primary" | "secondary";

const ButtonContainer = styled.Pressable<{ $size: Size; $disabled: boolean; $block: boolean; $type: ButtonType }>`
  ${({ theme, $size, $disabled, $block, $type }) => {
    const config = theme.presets.Button[$size];
    const getBgColor = () => {
      if ($disabled) return theme.colors.buttonDisabled;
      return $type === "primary" ? theme.colors.primary : theme.colors.secondaryButtonBg;
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

const ButtonContent = styled(Typography)<{
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
}

export function Button({
  size = "md",
  title,
  block = false,
  disabled = false,
  type = "primary",
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <ButtonContainer
      $size={size}
      $disabled={!!disabled}
      $block={block}
      disabled={disabled}
      $type={type}
      {...props}
      style={({ pressed }) => ({
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <ButtonContent $size={size} $disabled={!!disabled} $type={type}>
        {title}
      </ButtonContent>
    </ButtonContainer>
  );
}
