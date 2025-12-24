import { Platform } from "react-native";
const isIOS = Platform.OS === "ios";

/** 字体族：处理跨平台默认字体的回退逻辑 */
const family = Platform.select({
  ios: { base: "System", numeric: "System" },
  android: { base: "sans-serif", numeric: "monospace" },
  default: { base: "sans-serif", numeric: "monospace" },
});

/** 物理字号阶梯：基于 2px 步进 */
const size = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 32 };

/** 字重：400(常规), 600(中粗), 700(粗体) */
const weight = { regular: "400", medium: "600", bold: "700" };

/** 行高阶梯：确保多行文本阅读时不挤压、不松散 */
const lineHeight = { xs: 16, sm: 20, md: 24, lg: 26, xl: 28, xxl: 32, xxxl: 40 };

/** 字间距：优化大标题在 iOS 上的视觉紧凑感 */
const letterSpacing = {
  xs: 0.5,
  sm: 0.3,
  md: 0,
  lg: 0,
  xl: isIOS ? -0.2 : 0,
  xxl: isIOS ? -0.4 : 0,
  xxxl: isIOS ? -0.6 : 0,
};
/** 字体特性：启用 iOS 的等宽数字，防止倒计时数字跳动 */
const variant = { numeric: isIOS ? ["tabular-nums"] : [] };

export const typography = {
  family: family,
  size: size,
  weight: weight,
  lineHeight: lineHeight,
  letterSpacing: letterSpacing,
  variant: variant,
  presets: {
    /** 巨型标题：仅用于欢迎页、大留白开屏 */
    heading: {
      fontFamily: family.base,
      fontSize: size.xxxl,
      lineHeight: lineHeight.xxxl,
      fontWeight: weight.bold,
      letterSpacing: letterSpacing.xxxl,
    },
    /** 页面级标题：导航栏标题、个人中心用户名 */
    title: {
      fontFamily: family.base,
      fontSize: size.xxl,
      lineHeight: lineHeight.xxl,
      fontWeight: weight.bold,
    },
    /** 模块级标题：卡片标题、弹窗标题 */
    subheading: {
      fontFamily: family.base,
      fontSize: size.xl,
      lineHeight: lineHeight.xl,
      fontWeight: weight.medium,
    },
    /** 标准正文：聊天消息内容、文章段落。App 中使用率最高 */
    body: {
      fontFamily: family.base,
      fontSize: size.md,
      lineHeight: lineHeight.md,
      fontWeight: weight.regular,
    },
    /** 强调正文：用于正文中需要加粗突出的信息 */
    bodyStrong: {
      fontFamily: family.base,
      fontSize: size.md,
      lineHeight: lineHeight.md,
      fontWeight: weight.bold,
    },
    /** 表单与标签：按钮文字、输入框 Label、底部 Tab 文字 */
    label: {
      fontFamily: family.base,
      fontSize: size.sm,
      lineHeight: lineHeight.sm,
      fontWeight: weight.medium,
    },
    /** 辅助小字：消息时间戳、表单底部声明、灰色提示文字 */
    caption: {
      fontFamily: family.base,
      fontSize: size.xs,
      lineHeight: lineHeight.xs,
      fontWeight: weight.regular,
    },
    /** 装饰性小标：用于全大写分类标签，具有较明显的字间距 */
    overline: {
      fontFamily: family.base,
      fontSize: size.xs,
      lineHeight: lineHeight.xs,
      fontWeight: weight.bold,
      letterSpacing: 1.2,
    },
    /** 等宽数字：专门用于余额、倒计时、金融账单 */
    numeric: {
      fontFamily: family.numeric,
      fontSize: size.xl,
      lineHeight: lineHeight.xl,
      fontWeight: weight.bold,
      fontVariant: variant.numeric,
    },
  },
} as const;
