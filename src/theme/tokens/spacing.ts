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
  /** 登录页顶部内边距 */
  paddingTopHeader: 160,
  /** 标题距离登录页按钮的距离 */
  ActionToHeader: 174,
  /** 登录页水平内边距 */
  screenHorizontalPadding: 24,
  /** header内容边距 */
  headerPaddingLeft: 16,
  /** 导航栏左右操作区最小宽度：确保标题绝对居中 (建议 40-56 之间) */
  headerLeftAndRightWidth: 56,
  /** 不同系统直接header的标准高度*/
  navBarHeight: Platform.OS === "ios" ? 44 : 56,
} as const;

/** 3. 统一导出对象 */
export const spacing = {
  step,
  layout,
} as const;
