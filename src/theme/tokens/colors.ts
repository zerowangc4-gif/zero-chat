export const palette = {
  // 基础色
  white: "#FFFFFF",
  black: "#000000",

  // 灰度阶梯 (由浅入深)
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    150: "#E8E8E8",
    200: "#EEEEEE",
    300: "#DDDDDD",
    400: "#999999",
    500: "#666666",
    600: "#444444",
    700: "#333333",
    800: "#262626",
    900: "#1A1A1A",
    950: "#121212",
  },
  // 品牌色
  brand: "#00e5ff",
};
export const lightColors = {
  /** 纯白 */
  white: palette.white,
  /** 纯黑 */
  black: palette.black,
  /** 背景色 */
  bgPage: palette.gray["50"],
  /** 同心圆第一层 */
  ringDeep: palette.gray["300"],
  /** 同心圆第二层 */
  ringMedium: palette.gray["150"],
  /** 同心圆第三层 */
  ringLight: palette.gray["200"],
  /** 同心圆第四层 */
  ringFaint: palette.gray["100"],
  /** 次要文字 */
  secondaryWord: palette.gray["500"],
  /** 主按钮背景色 */
  primaryButtonBg: palette.black,
  /** 次按钮背景色 */
  secondaryButtonBg: palette.gray["50"],
  /** 主按钮文字颜色 */
  primaryButtonTextColor: palette.white,
  /** 次按钮文字颜色 */
  secondaryButtonTextColor: palette.black,
  /** 按钮边框颜色 */
  ButtonBorderColor: palette.black,
} as const;

export const darkColors: typeof lightColors = {
  /** 纯白：用于容器底色、反色文字 */
  white: palette.white,
  /** 纯黑：用于极端投影、遮罩层 */
  black: palette.black,
  /** 背景色 */
  bgPage: palette.gray["950"],
  /** 同心圆第一层 */
  ringDeep: palette.gray["50"],
  /** 同心圆第二层 */
  ringMedium: palette.gray["100"],
  /** 同心圆第三层 */
  ringLight: palette.gray["150"],
  /** 同心圆第四层 */
  ringFaint: palette.gray["100"],
  /** 次要文字 */
  secondaryWord: palette.gray["100"],
  /** 主按钮背景色 */
  primaryButtonBg: palette.black,
  /** 次按钮背景色 */
  secondaryButtonBg: palette.gray["50"],
  /** 按钮文字颜色 */
  primaryButtonTextColor: palette.white,
  /** 次按钮文字颜色 */
  secondaryButtonTextColor: palette.white,
  /** 按钮边框颜色 */
  ButtonBorderColor: palette.black,
};
