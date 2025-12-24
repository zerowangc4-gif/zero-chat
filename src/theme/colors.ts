const palette = {
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

  // --- 文本色彩 (Text) ---
  /** 主要文字：标题、正文。高对比度，确保易读性 */
  textPrimary: palette.gray["900"],
  /** 次要文字：用于辅助说明、副标题、时间戳。中对比度 */
  textSecondary: palette.gray["500"],
  /** 占位文字：输入框提示语、禁用状态文字。低对比度 */
  textPlaceholder: palette.gray["400"],
  /** 反色文字：当背景为深色（如品牌色按钮）时使用 */
  textInverse: palette.white,

  // --- 背景色彩 (Background) ---
  /** 页面底色：全屏背景色。略暗于容器色，以产生视觉深度 */
  bgPage: palette.gray["100"],
  /** 容器底色：白色卡片、列表条目、输入框内部底色 */
  bgContainer: palette.white,
  /** 按下态底色：用户点击列表、单元格时的反馈灰色 */
  bgPressed: palette.gray["150"],

  // --- 线条色彩 (Border) ---
  /** 基础分割线：如微信聊天列表条目间的极细线 */
  borderBase: palette.gray["200"],
  /** 组件边框线：用于输入框(Input)外框、描边按钮外框 */
  borderElement: palette.gray["300"],

  /** 品牌主色：App 的视觉核心，代表操作重心 */
  primary: palette.brand.green,
  /** 品牌色按下态：主色点击后的反馈，通常通过加深色值实现 */
  primaryPressed: palette.brand.greenPressed,
  /** 错误色：表单校验失败、删除警示、报错提示 */
  error: palette.red,
  /** 成功色：操作完成、校验通过、支付成功 */
  success: palette.greenSuccess,
} as const;

export const darkColors: typeof lightColors = {
  white: palette.black,
  black: palette.white,

  textPrimary: palette.gray["50"],
  textSecondary: palette.gray["400"],
  textPlaceholder: palette.gray["600"],
  textInverse: palette.white,

  bgPage: palette.black,
  bgContainer: palette.gray["950"],
  bgPressed: palette.gray["800"],

  borderBase: palette.gray["800"],
  borderElement: palette.gray["700"],

  primary: palette.brand.green,
  primaryPressed: palette.brand.greenDark,
  error: palette.red,
  success: palette.greenSuccess,
};
