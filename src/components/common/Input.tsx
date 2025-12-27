import React from "react";
import { Platform, TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Size } from "@/theme/presets";
const androidInputFix: TextInputProps = Platform.select({
  android: {
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingVertical: 0,
  },
  default: {},
});

const StyledInput = styled.TextInput<{ $size: "lg" | "md" | "sm" }>`
  ${({ theme, $size }) => {
    const config = theme.presets.Input[$size];
    return css`
      font-family: ${theme.typography.family.base};
      height: ${config.height}px;
      font-size: ${config.fontSize}px;
      padding-horizontal: ${config.paddingHorizontal}px;
      border-width: ${config.borderWidth};
      border-color: ${theme.colors.borderBase};
      align-items: center;
    `;
  }}
`;

interface InputProps {
  size?: Size;
}
export const Input = ({ size = "md", ...props }: InputProps) => {
  console.log(androidInputFix);
  return <StyledInput $size={size} {...androidInputFix} {...props} />;
};
