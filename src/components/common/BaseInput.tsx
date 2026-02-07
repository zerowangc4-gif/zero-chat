import styled, { css } from "styled-components/native";
import { Platform, TextInputProps } from "react-native";
import { Size } from "@/theme/presets";

export const BaseInput = styled.TextInput.attrs<TextInputProps & { $size?: Size }>(props => ({
  includeFontPadding: false,
  textAlignVertical: "center",
  underlineColorAndroid: "transparent",
  selectionColor: props.theme.palette.brand,
  autoCapitalize: "none",
  autoCorrect: false,
  placeholderTextColor: props.theme.colors.secondaryWord,
}))<{ $size?: Size }>`
  flex: 1;
  align-self: stretch;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border-width: 0;
  font-variant: ${Platform.OS === "ios" ? "tabular-nums" : "undefined"};

  ${({ theme, $size }) => {
    const config = $size ? theme.presets.Input[$size] : null;
    return css`
      color: ${theme.colors.word};
      font-family: ${theme.typography.family.base};
      font-size: ${config ? config.fontSize : theme.typography.size.md}px;
    `;
  }}
`;
