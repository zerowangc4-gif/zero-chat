import { lightColors, darkColors, typography, spacing, radii, interactive } from "./tokens";

import { Text } from "./presets";

const getTheme = (isDark: boolean) => {
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    radii,
    interactive,
    presets: { Text: Text },
  } as const;
};

export const lightTheme = getTheme(false);
export const darkTheme = getTheme(true);
export type ThemeType = typeof lightTheme;
