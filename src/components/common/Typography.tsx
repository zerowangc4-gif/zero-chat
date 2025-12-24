import { TextProps } from "react-native";
import styled from "styled-components/native";
import { ThemeType } from "@/theme/schemas";

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
  color?: keyof ThemeType["colors"] | string;
}

export const Typography = styled.Text.attrs({
  includeFontPadding: false,
  textAlignVertical: "center",
} as TextProps)<AppTextProps>`
  font-family: ${({ theme, type = "body" }) => theme.typography.presets[type].fontFamily};
  font-size: ${({ theme, type = "body" }) => theme.typography.presets[type].fontSize}px;
  font-weight: ${({ theme, type = "body" }) => theme.typography.presets[type].fontWeight};
  line-height: ${({ theme, type = "body" }) => theme.typography.presets[type].lineHeight}px;

  ${({ theme, type = "body" }) => {
    const style = theme.typography.presets[type];
    let extra = "";

    if ("letterSpacing" in style && typeof style.letterSpacing === "number") {
      extra += `letter-spacing: ${style.letterSpacing}px; `;
    }

    if ("fontVariant" in style && Array.isArray(style.fontVariant) && style.fontVariant.length > 0) {
      extra += `font-variant: ${style.fontVariant.join(" ")}; `;
    }
    return extra;
  }}

  color: ${({ theme, type = "body", color }) => {
    // 检查 color 是否是主题定义的 key，或者是原始颜色字符串
    const themeColor = theme.colors[color as keyof ThemeType["colors"]];
    if (color && (themeColor || color)) {
      return themeColor || color;
    }

    const colorMap: Record<TypographyPreset, keyof ThemeType["colors"]> = {
      heading: "textPrimary",
      title: "textPrimary",

      subheading: "textPrimary",
      body: "textPrimary",
      bodyStrong: "textPrimary",

      label: "textSecondary",
      caption: "textSecondary",
      overline: "textPlaceholder",
      numeric: "textPrimary",
    };
    const targetKey = colorMap[type] || "textPrimary";
    return theme.colors[targetKey];
  }};

  flex-shrink: 1;
`;
