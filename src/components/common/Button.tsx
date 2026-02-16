import React from "react";
import { PressableProps, ActivityIndicator } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import { Typography } from "./Typography";

const Container = styled.Pressable<{ $size: Size; $block: boolean; $bg?: string }>`
  ${({ theme, $size, $block, $bg }) => {
    const config = theme.presets.Button[$size];
    return css`
      height: ${config.height}px;
      width: ${$block ? "100%" : "auto"};
      align-self: ${$block ? "stretch" : "flex-start"};
      border-radius: ${config.borderRadius}px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: ${$bg || theme.colors.base};
      border-style: solid;
      border-width: ${!$bg ? 1 : 0}px;
    `;
  }}
`;
const Content = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;
const Text = styled(Typography)<{
  $size: Size;
  $color: string;
}>`
  ${({ theme, $size, $color }) => {
    const config = theme.presets.Button[$size];
    return css`
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      color: ${$color};
    `;
  }}
`;

interface ButtonProps extends PressableProps {
  size?: Size;
  block?: boolean;
  title: string;
  loading?: boolean;
  bgColor?: string;
  color?: string;
  textColor?: string;
}

export function Button({
  size = "md",
  title,
  block = true,
  disabled = false,
  loading = false,
  bgColor,
  textColor,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  /* 控制你按钮背景色 */
  const bg = disabled ? theme.colors.disableButtonBg : bgColor;
  /* 控制文字颜色 */
  const color = textColor || theme.colors.base;
  return (
    <Container
      {...props}
      $size={size}
      $block={block}
      $bg={bg}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : bg,
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <Content>
        <Text $size={size} $color={color}>
          {title}
        </Text>
        {loading && <ActivityIndicator size="small" />}
      </Content>
    </Container>
  );
}
