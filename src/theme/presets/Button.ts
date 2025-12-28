import { Platform } from "react-native";

const fontSizeBase = { sm: 12, md: 14, lg: 16 };

const RATIOS = {
  LINE_HEIGHT: 1.4,
  RADIUS: 0.4,
  PADDING_V: 0.6,
  ICON_SCALE: { sm: 1, md: 1.15, lg: 1.25 },
  GAP: 0.4,
  MIN_WIDTH_FACTOR: 4,
};

const deriveToken = (size: keyof typeof fontSizeBase) => {
  const fs = fontSizeBase[size];
  const iconScale = RATIOS.ICON_SCALE[size];

  const contentHeight = Math.round(fs * RATIOS.LINE_HEIGHT) + Math.round(fs * RATIOS.PADDING_V) * 2;

  return {
    fontSize: fs,
    lineHeight: Math.round(fs * RATIOS.LINE_HEIGHT),
    borderRadius: Math.round(fs * RATIOS.RADIUS),
    paddingHorizontal: fs,
    paddingVertical: Math.round(fs * RATIOS.PADDING_V),
    iconSize: Math.round(fs * iconScale),
    gap: Math.round(fs * RATIOS.GAP),
    iconOffset: Platform.OS === "android" ? 1 : 0,
    fontweight: {
      regular: "400",
      semibold: "600",
      bold: Platform.OS === "ios" ? "700" : "bold",
    },
    minWidth: fs * RATIOS.MIN_WIDTH_FACTOR,

    /** * 触控热区补偿：根据 Apple 指南，触控区不应小于 44px
     * 如果计算高度小于 44，通过 hitSlop 补齐
     */
    hitSlop: contentHeight < 44 ? Math.round((44 - contentHeight) / 2) : 0,

    /**
     * 物理回弹系数：用于 transform: scale
     * 尺寸越大，感知惯性越强，缩放幅度越小
     */
    pressScale: size === "sm" ? 0.95 : size === "md" ? 0.97 : 0.98,
  };
};
export type Size = "sm" | "md" | "lg";
export const Button = {
  sm: deriveToken("sm"),
  md: deriveToken("md"),
  lg: deriveToken("lg"),
};
