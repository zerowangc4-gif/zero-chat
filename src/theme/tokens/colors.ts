export const palette = {
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F8FAFC",

    100: "#F1F5F9",

    200: "#E2E8F0",

    300: "#CBD5E1",

    400: "#94A3B8",

    500: "#64748B",

    600: "#475569",

    700: "#334155",

    800: "#1E293B",

    900: "#0F172A",
    950: "#020617",
  },
  brand: "#07C160",
  error: "#FF3B30",
};
export const lightColors = {
  /** 基础色 */
  base: palette.white,
  /** 基础反色 */
  baseInverse: palette.black,
  /** 背景色 */
  bgPage: palette.gray["50"],
  /** 次级填充色*/
  fillSecondary: palette.gray["100"],
  /** 分割线的颜色 */
  divider: palette.gray["100"],
  /** 通用组件背景 */
  surfaceBg: palette.white,
  /** 边框常态颜色 */
  borderColor: palette.gray["200"],
  /** 激活颜色 */
  activeColor: palette.brand,
  /** 次要文字 */
  secondaryWord: palette.gray["500"],
  /** 禁用按钮背景色 */
  disableButtonBg: palette.gray["300"],
} as const;

export const darkColors: typeof lightColors = {
  /** 基础色 */
  base: palette.white,
  /** 基础反色 */
  baseInverse: palette.black,
  /** 背景色 */
  bgPage: palette.gray["50"],
  /** 次级填充色*/
  fillSecondary: palette.gray["100"],
  /** 分割线的颜色 */
  divider: palette.gray["100"],
  /** 通用组件背景 */
  surfaceBg: palette.white,
  /** 边框常态颜色 */
  borderColor: palette.gray["200"],
  /** 激活颜色 */
  activeColor: palette.brand,
  /** 次要文字 */
  secondaryWord: palette.gray["500"],
  /** 禁用按钮背景色 */
  disableButtonBg: palette.gray["300"],
};
