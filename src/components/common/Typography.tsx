import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { TextStyle } from "@/theme/presets";

export type TypographyPreset = "brand" | "heading" | "main" | "caption" | "numeric";

export type WeightType = "regular" | "medium" | "bold";

interface AppTextProps extends TextProps {
  type?: TypographyPreset;
  color?: string;
  weight?: WeightType;
}

export const Typography = styled.Text.attrs<AppTextProps>(
  () =>
    ({
      includeFontPadding: false,
    }) as TextProps,
)<AppTextProps>`
  ${({ theme, type = "main", color, weight = "regular" }) => {
    const style = theme.presets.Text[type] as TextStyle;
    const lineHeight = style.lineHeight || style.fontSize;
    return css`
      font-family: ${style.fontFamily};
      font-size: ${style.fontSize}px;
      font-weight: ${theme.typography.weight[weight]};
      color: ${color};
      line-height: ${lineHeight}px;
      padding-bottom: 2px;
      ${style.letterSpacing ? `letter-spacing: ${style.letterSpacing}px;` : ""}
      ${style.fontVariant && style.fontVariant.length > 0 ? `font-variant: ${style.fontVariant.join(" ")};` : ""}
       flex-shrink: 1;
    `;
  }}
`;
