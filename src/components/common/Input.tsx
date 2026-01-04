import React, { useState } from "react";
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

const InputContainer = styled.View<{
  $size: Size;
  $isFocused: boolean;
}>`
  ${({ theme, $size, $isFocused }) => {
    const config = theme.presets.Input[$size];
    const borderColor = $isFocused ? theme.colors.primary : theme.colors.borderBase;
    return css`
      flex-direction: row;
      align-items: center;
      height: ${config.height}px;
      padding-left: ${config.fontSize}px;
      border-width: ${config.borderWidth}px;
      border-color: ${borderColor};
      border-radius: ${config.borderRadius}px;
    `;
  }}
`;

const RightActions = styled.View<{
  $size: Size;
}>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      padding-left: ${config.fontSize}px;
      padding-right: ${config.fontSize}px;
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

export const Input = ({ size = "md", value, ...props }: InputProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <InputContainer $size={size} $isFocused={isFocused}>
      <InnerInput
        {...props}
        $size={size}
        value={value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry && !passwordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={theme.colors.textTertiary}
        selectionColor={theme.colors.primary}
        onFocus={e => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />

      <RightActions $size={size}>
        {!!value && !props.secureTextEntry && (
          <Pressable onPress={() => props.onChangeText?.("")} hitSlop={20}>
            <IconFont name="close_circle" size={16} color={theme.colors.textTertiary} />
          </Pressable>
        )}

        {props.secureTextEntry && (
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)} hitSlop={20}>
            <IconFont name={passwordVisible ? "open_eyes" : "icon-close-eyes"} size={20} />
          </Pressable>
        )}
      </RightActions>
    </InputContainer>
  );
};
