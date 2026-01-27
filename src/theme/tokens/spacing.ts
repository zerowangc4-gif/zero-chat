import { Platform } from "react-native";
/** 物理间距阶梯：所有的 UI 间距必须从此选择 */
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

/** 2. 语义化布局预设：定义组装逻辑 */
const layout = {
  /** 同心圆距离顶部 */
  homeTop: 120,
  /** 操作按钮距底部*/
  ActionButtonBottom: 96,
  /** 不同系统直接header的标准高度*/
  navBarHeight: Platform.OS === "ios" ? 44 : 56,
} as const;

/** 3. 统一导出对象 */
export const spacing = {
  step,
  layout,
} as const;
