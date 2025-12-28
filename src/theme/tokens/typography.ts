import { Platform } from "react-native";
const isIOS = Platform.OS === "ios";

/** 字体族：处理跨平台默认字体的回退逻辑 */
export const family = Platform.select({
  ios: { base: "System", numeric: "System" },
  android: { base: "sans-serif", numeric: "monospace" },
  default: { base: "sans-serif", numeric: "monospace" },
});

/** 物理字号阶梯：基于 2px 步进 */
export const size = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 32 };

/** 字重：400(常规), 600(中粗), 700(粗体) */
export const weight = { regular: "400", medium: "600", bold: "700" };

/** 行高阶梯：确保多行文本阅读时不挤压、不松散 */
export const lineHeight = { xs: 16, sm: 20, md: 24, lg: 26, xl: 28, xxl: 32, xxxl: 40 };

/** 字间距：优化大标题在 iOS 上的视觉紧凑感 */
export const letterSpacing = {
  xs: 0.5,
  sm: 0.3,
  md: 0,
  lg: 0,
  xl: isIOS ? -0.2 : 0,
  xxl: isIOS ? -0.4 : 0,
  xxxl: isIOS ? -0.6 : 0,
};
/** 字体特性：启用 iOS 的等宽数字，防止倒计时数字跳动 */
export const variant = { numeric: isIOS ? ["tabular-nums"] : [] };

export const typography = {
  family: family,
  size: size,
  weight: weight,
  lineHeight: lineHeight,
  letterSpacing: letterSpacing,
  variant: variant,
} as const;
