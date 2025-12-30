export const palette = {
  // 基础色
  white: "#FFFFFF",
  black: "#000000",

  // 灰度阶梯 (由浅入深)
  gray: {
    50: "#FAFAFA", // 近似纯白
    100: "#F5F5F5", // 你的 bgPage (Light)
    150: "#E8E8E8",
    200: "#EEEEEE", // 你的 borderBase (Light)
    300: "#DDDDDD", // 你的 borderElement (Light)
    400: "#999999", // 你的 textPlaceholder (Light)
    500: "#666666", // 你的 textSecondary (Light)
    600: "#444444", // 中灰
    700: "#333333", // 深灰
    800: "#262626", // 接近纯黑的灰 (Dark Container)
    900: "#1A1A1A", // 你的 textPrimary (Light)
    950: "#121212", // 极深灰 (Dark Page)
  },

  // 品牌色
  brand: {
    green: "#07C160", // 你的 primary
    greenPressed: "#06A954", // 你的 primaryPressed
    greenDark: "#059048", // 深色模式下的点击态微调
  },

  // 状态色
  red: "#FF4D4F", // 你的 error
  greenSuccess: "#52C41A", // 你的 success
};
export const lightColors = {
  /** 纯白：用于容器底色、反色文字 */
  white: palette.white,
  /** 纯黑：用于极端投影、遮罩层 */
  black: palette.black,
  /** 与背景色相反的颜色 */
  textPrimary: palette.black,
  /** 品牌色:用于登录按钮 */
  primary: palette.brand.green,
  /** 反色文本：当背景是品牌色按钮（如绿色）时使用*/
  textInverse: palette.white,
  /** 页面底色：浅灰色，产生层次感 */
  bgPage: palette.gray["100"],
  /** 按钮禁用背景色 */
  buttonDisabled: palette.gray["300"],
  /** 按钮禁用文字 */
  buttonTextDisabled: palette.gray["400"],
  /** * 基础边框色：用于低对比度场景 ,输入框边框，header 边框*/
  borderBase: palette.gray["200"],
  /** 用处：输入框占位符、下方小字提示、不可点击的失效文字 */
  textTertiary: palette.gray["400"],
  /** 用于副标题，比标题略淡，建立视觉平衡，不抢主标题风头 */
  textSecondary: palette.gray["500"],
} as const;

export const darkColors: typeof lightColors = {
  /** 纯白：用于容器底色、反色文字 */
  white: palette.white,
  /** 纯黑：用于极端投影、遮罩层 */
  black: palette.black,
  /** 主文字颜色,用于大标题，副标题，正文文字 */
  textPrimary: palette.white,
  /** 品牌色:用于登录按钮 */
  primary: palette.brand.green,
  /** 反色文本：当背景是品牌色按钮（如绿色）时使用*/
  textInverse: palette.white,
  /** 页面底色：深灰色，产生层次感 */
  bgPage: palette.gray["950"],
  /** 按钮禁用背景色 */
  buttonDisabled: palette.gray["800"],
  /** 按钮禁用文字 */
  buttonTextDisabled: palette.gray["600"],
  /** * 基础边框色：用于低对比度场景 ,输入框边框，header 边框*/
  borderBase: palette.gray["800"],
  /** 用处：输入框占位符、下方小字提示、不可点击的失效文字 */
  textTertiary: palette.gray["600"],
  /** 用于副标题，比标题略淡，建立视觉平衡，不抢主标题风头 */
  textSecondary: palette.gray["300"],
};
