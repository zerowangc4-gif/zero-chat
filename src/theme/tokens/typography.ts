import { Platform } from "react-native";
const isIOS = Platform.OS === "ios";

const family = Platform.select({
  ios: { base: "System", numeric: "System" },
  android: { base: "sans-serif", numeric: "monospace" },
  default: { base: "sans-serif", numeric: "monospace" },
});

const size = { xs: 12, md: 16, lg: 24, xl: 32, xxl: 40, xxxl: 48 };

const weight = { regular: "400", medium: "600", bold: "700" };

const letterSpacing = {
  xs: 0.5,
  sm: 0.3,
  md: 0,
  lg: 0,
  xl: isIOS ? -0.2 : 0,
  xxl: isIOS ? -0.4 : 0,
  xxxl: isIOS ? -0.6 : 0,
};

const variant = { numeric: isIOS ? ["tabular-nums"] : [] };

export const typography = {
  family: family,
  size: size,
  weight: weight,
  letterSpacing: letterSpacing,
  variant: variant,
} as const;
