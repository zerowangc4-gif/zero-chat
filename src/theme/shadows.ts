import { Platform } from "react-native";
const presets = {
  low: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    android: { elevation: 3 },
  }),
  mid: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
    android: { elevation: 6 },
  }),
};
export const getShadows = (isDark: boolean) => ({
  low:
    isDark && Platform.OS === "ios"
      ? { ...presets.low, shadowOpacity: 0.3 } // 暗色模式加重阴影
      : presets.low,
  mid: isDark && Platform.OS === "ios" ? { ...presets.mid, shadowOpacity: 0.4 } : presets.mid,
});
