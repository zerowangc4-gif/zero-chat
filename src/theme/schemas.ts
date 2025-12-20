import { palette, spacing, typography, borderRadius } from "./tokens";

const getTheme = (isDark: boolean) => ({
  mode: isDark ? ("dark" as const) : ("light" as const),
  spacing,
  radius: borderRadius,
  typography: {
    ...typography,
    presets: {
      navTitle: { size: typography.size.xl, weight: typography.weight.semibold },
      chatMessage: { size: typography.size.md, lineHeight: 22 },
      chatTime: { size: typography.size.xs, color: palette.gray[500] },
      balance: {
        size: typography.size.huge,
        weight: typography.weight.bold,
        family: typography.family.mono,
      },
    },
  },
  colors: {
    background: isDark ? palette.black : palette.gray[100],
    surface: isDark ? palette.gray[900] : palette.white,
    primary: palette.primary[500],
    text: {
      main: isDark ? palette.white : palette.black,
      sub: palette.gray[500],
      inverse: isDark ? palette.black : palette.white,
    },
    border: isDark ? palette.gray[700] : palette.gray[200],
    bubble: {
      me: palette.primary[500],
      other: isDark ? palette.gray[900] : palette.white,
    },
  },
});

export const lightTheme = getTheme(false);
export const darkTheme = getTheme(true);
export type ThemeType = typeof lightTheme;
