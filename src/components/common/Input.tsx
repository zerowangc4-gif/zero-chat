import React from "react";
import { Platform, TextInputProps, Pressable } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import IconFont, { IconNames } from "@/assets/font/iconfont";
const androidInputFix: TextInputProps = Platform.select({
  android: {
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingVertical: 0,
  },
  default: {},
});
const InputRoot = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const InputContainer = styled.View<{
  $size: Size;
  $borderType: "all" | "bottom" | "none";
}>`
  ${({ theme, $size, $borderType }) => {
    const config = theme.presets.Input[$size];

    return css`
      flex: 1;
      height: ${config.height}px;
      padding-horizontal: ${config.paddingHorizontal}px;
      flex-direction: row;
      align-items: center;
      ${$borderType === "all" &&
      css`
        border-width: ${config.borderWidth}px;
        border-color: ${theme.colors.borderBase};
        border-radius: ${config.borderRadius}px;
      `}

      ${$borderType === "bottom" &&
      css`
        border-bottom-width: ${config.borderWidth}px;
        border-bottom-color: ${theme.colors.borderBase};
      `}
    `;
  }}
`;

const IconSlot = styled.View<{ $pos: "left" | "right"; $size: Size }>`
  justify-content: center;
  align-items: center;
  ${({ $pos, $size, theme }) => {
    const config = theme.presets.Input[$size];
    return css`
      width: ${config.iconSize}px;
      height: ${config.iconSize}px;
      ${$pos === "left"
        ? css`
            padding-right: ${config.iconSpacing}px;
          `
        : css`
            padding-left: ${config.iconSpacing}px;
          `}
    `;
  }}
`;
const InnerInput = styled.TextInput<{ $size: Size }>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      flex: 1;
      align-self: stretch;
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      ${Platform.select({
        android: css`
          padding-vertical: 0;
        `,
      })}
    `;
  }}
`;

interface InputProps extends TextInputProps {
  size?: Size;
  borderType?: "all" | "bottom" | "none";
  label?: string;
  leftIcon?: IconNames;
  rightIcon?: IconNames;
}

export const Input = ({
  size = "md",
  borderType = "all",
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  const theme = useTheme();
  const iconSize = theme.presets.Input[size].iconSize;
  const clearIconSize = theme.presets.Input[size].clearIconSize;
  return (
    <InputRoot>
      <InputContainer $size={size} $borderType={borderType}>
        {/* 1. 左图标 */}
        {leftIcon && (
          <IconSlot $pos="left" $size={size}>
            <IconFont name={leftIcon} size={iconSize} color="#666" />
          </IconSlot>
        )}

        {/* 2. 输入框 (它会撑开中间剩下的空间) */}
        <InnerInput $size={size} value={value} onChangeText={onChangeText} {...androidInputFix} {...props} />

        {/* 3. 清除按钮 */}
        {!!value && (
          <Pressable onPress={() => onChangeText?.("")} hitSlop={10}>
            <IconSlot $pos="right" $size={size}>
              <IconFont name="close_circle" size={clearIconSize} color="#999" />
            </IconSlot>
          </Pressable>
        )}

        {/* 4. 右图标  */}
        {rightIcon && (
          <IconSlot $pos="right" $size={size}>
            <IconFont name={rightIcon} size={iconSize} color="#666" />
          </IconSlot>
        )}
      </InputContainer>
    </InputRoot>
  );
};
