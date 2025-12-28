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
  /**双行标题、标题与副标题、标签与必填星号 */
  tight: step.xxs,
  /**双行标题、标题与副标题、标签与必填星号 */
  headerPaddingLeft: step.md,
  /** * 32px - 标准页面边距：
   * 常用场景：ContentContainer 的左右 Padding、表单组 (FormGroup) 之间的间距
   */
  base: 32,

  /** * 48px - 宽松间距：
   * 常用场景：输入框组与下方操作按钮区 (ActionSection) 之间的呼吸感
   */
  loose: 48,

  /** * 64px - 巨大留白 (品牌位)：
   * 常用场景：顶部欢迎语 (BrandHeading) 与下方表单起始位置之间的距离，产生沉浸感
   */
  massive: 64,
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
