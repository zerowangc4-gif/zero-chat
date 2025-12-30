import React from "react";
import { Platform, TextInputProps, Pressable, TextProps } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import IconFont, { IconNames } from "@/assets/font/iconfont";

export const BaseInput = styled.TextInput.attrs(
  () =>
    ({
      includeFontPadding: Platform.OS === "android" ? false : undefined,
      textAlignVertical: Platform.OS === "android" ? "center" : undefined,
      underlineColorAndroid: "transparent",
    }) as TextProps,
)`
  flex: 1;
  align-self: stretch;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border-width: 0;
`;

const InputContainer = styled.View<{
  $size: Size;
  $borderType: "all" | "bottom" | "none";
}>`
  ${({ theme, $size, $borderType }) => {
    const config = theme.presets.Input[$size];
    return css`
      height: ${config.height}px;
      padding-horizontal: ${$borderType === "all" ? config.paddingHorizontal : 0}px;
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

const InnerInput = styled(BaseInput)<{ $size: Size }>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      color: ${theme.colors.textPrimary};
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
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

export const Input = ({ size = "md", borderType = "all", value, onChangeText, ...props }: InputProps) => {
  const theme = useTheme();
  return (
    <InputContainer $size={size} $borderType={borderType}>
      <InnerInput
        $size={size}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textTertiary}
        selectionColor={theme.colors.primary}
        {...props}
      />

      {!!value && (
        <Pressable onPress={() => onChangeText?.("")} hitSlop={12}>
          <IconFont name="close_circle" size={12} color={theme.colors.textTertiary} />
        </Pressable>
      )}
    </InputContainer>
  );
};
