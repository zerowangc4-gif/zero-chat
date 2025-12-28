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
  align-self: stretch;
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

const IconSlot = styled.View<{ $size: Size }>`
  justify-content: center;
  align-items: center;
  ${({ $size, theme }) => {
    const config = theme.presets.Input[$size];
    return css`
      width: ${config.height * 0.6}px;
      height: 100%;
    `;
  }}
`;

const InnerInput = styled.TextInput<{ $size: Size }>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      flex: 1;
      height: 100%;
      align-self: stretch;
      color: ${theme.colors.textPrimary};
      font-family: ${theme.typography.family.base};
      font-size: ${config.fontSize}px;
      line-height: ${config.lineHeight}px;
      ${Platform.select({
        android: css`
          padding-vertical: 0;
          padding-bottom: 2px;
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
  const config = theme.presets.Input[size];

  // 这里的间距可以根据精美感微调
  const spacing = config.iconSpacing || 8;

  return (
    <InputRoot>
      <InputContainer $size={size} $borderType={borderType}>
        {leftIcon && (
          <IconSlot $size={size} style={{ marginRight: spacing }}>
            <IconFont name={leftIcon} size={config.iconSize} color={theme.colors.textSecondary} />
          </IconSlot>
        )}

        <InnerInput
          $size={size}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.textTertiary}
          selectionColor={theme.colors.primary}
          {...androidInputFix}
          {...props}
        />

        {!!value && (
          <Pressable onPress={() => onChangeText?.("")} hitSlop={12}>
            <IconFont name="close_circle" size={config.clearIconSize} color={theme.colors.textTertiary} />
          </Pressable>
        )}

        {rightIcon && (
          <IconSlot $size={size} style={{ marginLeft: spacing }}>
            <IconFont name={rightIcon} size={config.iconSize} color={theme.colors.textSecondary} />
          </IconSlot>
        )}
      </InputContainer>
    </InputRoot>
  );
};
