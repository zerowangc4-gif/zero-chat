import React from "react";
import { Platform, TextInputProps, Pressable } from "react-native";
import styled, { css } from "styled-components/native";
import { Size } from "@/theme/presets";
import IconFont from "@/iconfont";
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
const LabelText = styled.Text<{ $size: Size }>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      font-size: ${config.labelFontSize}px;
      margin-bottom: ${config.labelMarginBottom}px;
      font-weight: 500;
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
            margin-right: ${config.iconSpacing}px;
          `
        : css`
            margin-left: ${config.iconSpacing}px;
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  size = "md",
  borderType = "all",
  label,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  return (
    <InputRoot>
      {label && <LabelText $size={size}>{label}</LabelText>}

      <InputContainer $size={size} $borderType={borderType}>
        {/* 1. 左图标 */}
        {leftIcon && (
          <IconSlot $pos="left" $size={size}>
            {leftIcon}
          </IconSlot>
        )}

        {/* 2. 输入框 (它会撑开中间剩下的空间) */}
        <InnerInput $size={size} value={value} onChangeText={onChangeText} {...androidInputFix} {...props} />

        {/* 3. 清除按钮：只有当 showClear 为 true 且有输入内容时显示 */}
        {!!value && (
          <Pressable
            onPress={() => onChangeText?.("")}
            hitSlop={10} // 扩大点击热区，提升体验
          >
            <IconSlot $pos="right" $size={size}>
              {/* 这里 name 填你阿里图标库里“关闭”或“清除”的名字，比如 "close-circle" */}
              <IconFont name="close_circle" size={16} color="#999" />
            </IconSlot>
          </Pressable>
        )}

        {/* 4. 右图标 (如果有的话，直接显示在最右边) */}
        {rightIcon && (
          <IconSlot $pos="right" $size={size}>
            {rightIcon}
          </IconSlot>
        )}
      </InputContainer>
    </InputRoot>
  );
};
