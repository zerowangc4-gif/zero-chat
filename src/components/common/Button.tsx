import React from "react";
import { PressableProps } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";
const ButtonContainer = styled.Pressable<{ $size: Size; $disabled: boolean; $block: boolean }>`
  ${({ theme, $size, $disabled, $block }) => {
    const config = theme.presets.Button[$size];
    return css`
      height: ${config.height}px;
      border-radius: ${config.borderRadius}px;
      background-color: ${$disabled ? theme.colors.buttonDisabled : theme.colors.primary};
      flex-direction: row;
      align-items: center;
      justify-content: center;
      align-self: ${$block ? "stretch" : "flex-start"};
      width: ${$block ? "100%" : "auto"};
    `;
  }}
`;

const ButtonContent = styled(Typography)<{ $size: Size; $disabled: boolean }>`
  ${({ theme, $size, $disabled }) => {
    const config = theme.presets.Button[$size];
    return css`
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      color: ${$disabled ? theme.colors.buttonTextDisabled : theme.colors.textInverse};
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
}

export function Button({ size = "md", title, block = false, disabled = false, ...props }: ButtonProps) {
  const theme = useTheme();
  return (
    <ButtonContainer
      $size={size}
      $disabled={!!disabled}
      $block={block}
      disabled={disabled}
      {...props}
      style={({ pressed }) => ({
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <ButtonContent $size={size} $disabled={!!disabled}>
        {title}
      </ButtonContent>
    </ButtonContainer>
  );
}
