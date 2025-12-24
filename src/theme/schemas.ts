import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { radii } from "./radii";
import { getShadows } from "./shadows";
import { interactive } from "./interactive";

const getTheme = (isDark: boolean) => {
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    radii,
    shadows: getShadows(isDark),
    interactive,
  } as const;
};

export const lightTheme = getTheme(false);
export const darkTheme = getTheme(true);
export type ThemeType = typeof lightTheme;
