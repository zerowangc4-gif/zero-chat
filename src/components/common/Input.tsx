import React, { useState } from "react";
import { TextInputProps, Pressable } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Size } from "@/theme/presets";
import IconFont, { IconNames } from "@/assets/font/iconfont";
import { BaseInput } from "./BaseInput";

const InputContainer = styled.View<{
  $size: Size;
  $isFocused: boolean;
}>`
  ${({ theme, $size, $isFocused }) => {
    const config = theme.presets.Input[$size];
    const borderColor = $isFocused ? theme.colors.activeColor : theme.colors.borderColor;
    return css`
      flex-direction: row;
      align-items: center;
      height: ${config.height}px;
      padding-left: ${config.fontSize}px;
      border-width: ${config.borderWidth}px;
      border-color: ${borderColor};
      border-radius: ${config.borderRadius}px;
      background-color: ${theme.colors.surfaceBg};
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
      <BaseInput
        {...props}
        $size={size}
        value={value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry && !passwordVisible}
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
        {props.secureTextEntry && (
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)} hitSlop={20}>
            <IconFont
              name={passwordVisible ? "icon-eye-open-copy" : "icon-eye-close-copy"}
              size={theme.typography.size.lg}
              color={theme.colors.secondaryWord}
            />
          </Pressable>
        )}
      </RightActions>
    </InputContainer>
  );
};
