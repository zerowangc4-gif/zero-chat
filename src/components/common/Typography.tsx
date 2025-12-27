import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { TextStyle } from "@/theme/presets";
export type TypographyPreset =
  | "heading"
  | "title"
  | "subheading"
  | "body"
  | "bodyStrong"
  | "label"
  | "caption"
  | "overline"
  | "numeric";

interface AppTextProps extends TextProps {
  type?: TypographyPreset;
  color?: string;
}

export const Typography = styled.Text.attrs<AppTextProps>(
  () =>
    ({
      includeFontPadding: false,
      textAlignVertical: "center",
    }) as TextProps,
)<AppTextProps>`
  ${({ theme, type = "body", color }) => {
    const style = theme.presets.Text[type] as TextStyle;
    return css`
      font-family: ${style.fontFamily};
      font-size: ${style.fontSize}px;
      font-weight: ${style.fontWeight};
      line-height: ${style.lineHeight}px;
      color: ${color};
      ${style.letterSpacing ? `letter-spacing: ${style.letterSpacing}px;` : ""}
      ${style.fontVariant && style.fontVariant.length > 0 ? `font-variant: ${style.fontVariant.join(" ")};` : ""}
       flex-shrink: 1;
    `;
  }}
`;
