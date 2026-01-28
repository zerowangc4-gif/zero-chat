import { Platform } from "react-native";
import { palette } from "./colors";
export const getShadows = (isDark: boolean) => ({
  low: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),
  mid: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.4 : 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
  }),
});
