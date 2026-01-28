import { Platform } from "react-native";

const step = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 56,
};

const layout = {
  /** 同心圆距离顶部 */
  homeTop: 104,
  /** 操作按钮距底部*/
  ActionButtonToBottom: 96,
  /** 不同系统直接header的标准高度*/
  navBarHeight: Platform.OS === "ios" ? 44 : 56,
} as const;

export const spacing = {
  step,
  layout,
} as const;
