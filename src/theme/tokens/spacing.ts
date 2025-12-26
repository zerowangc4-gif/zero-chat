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
};

/** 2. 语义化布局预设：定义组装逻辑 */
const layout = {
  /** 零间距：用于微信式条目、背景无缝衔接处 */
  flush: 0,
  /** 页面边距：内容距离手机屏幕左右边缘的“安全距离” (16px) */
  screenPadding: step.md,
  /** 容器边距：卡片(Card)、浮层(Modal) 内部的留白 (12px) */
  containerPadding: step.sm,
  /** 模块间距：页面中两个大型功能块之间的距离 (24px) */
  sectionGap: step.lg,
  /** 组件间距：输入框之间、卡片流之间的标准垂直距离 (12px) */
  componentGap: step.sm,
  /** 文字堆叠距：标题与下方描述文字之间的紧凑距离 (4px) */
  textStackGap: 4,
  /** 水平元素距：头像与名字、图标与文字的横向间距 (8px) */
  itemGap: step.xs,
  /** 极小修正：红点、微型状态图标的偏离值 (2px) */
  microGap: 2,
  /** 紧凑列表垂直距：微信聊天列表风格中，条目间无间距 (0) */
  listItemVGap: 0,
  /** 分割线规格：Retina 屏下的最细线 (0.5px) */
  separatorHeight: 0.5,
  /** 微信式线缩进：分割线避开头像占位的常用宽度 (72px) */
  separatorInset: 72,
  /** 点击热区：为了符合手指点击规范，最小高度不应低于 48px */
  minTouchableHeight: 48,
  /** 组件内填充：按钮文字到边框的最小间距 (8px) */
  clickableInset: step.xs,
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
