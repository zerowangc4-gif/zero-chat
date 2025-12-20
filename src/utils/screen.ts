import { Dimensions, PixelRatio } from "react-native";

// 获取当前屏幕的宽度
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * 设计稿基准宽度 (通常 iPhone 13/14/15 逻辑像素为 390 或 375)
 * 这里以 375 为例，如果你拿到的设计稿是按照 390 画的，请改为 390
 */
const DESIGN_WIDTH = 375;

/**
 * s (Scale) 比例缩放函数
 * * 【什么时候用？】
 * 1. 固定比例的元素：如 Banner 图、银行卡片、Logo 图标。
 * 2. 圆形元素：为了在不同屏幕上保持完美的圆，宽高需同步缩放。
 * 3. 绝对定位：需要精准计算在屏幕百分比位置的组件。
 * * 【什么时候绝对不能用！】
 * 1. 文字 (FontSize)：文字应保持系统原生大小，或通过断点适配，否则在大屏上会像老人机。
 * 2. 边框 (Border)：1px 就是 1px，缩放会导致线条模糊。
 * 3. 基础布局间距 (Padding/Margin)：大屏应展示更多内容，而不是更大的空白。
 */
export const s = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
