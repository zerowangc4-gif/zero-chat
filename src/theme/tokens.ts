export const palette = {
  primary: { 50: "#E6F0FF", 500: "#007AFF", 600: "#0062CC", 900: "#003366" },
  gray: {
    50: "#F9F9F9",
    100: "#F2F2F7",
    200: "#E5E5EA",
    300: "#D1D1D6",
    500: "#8E8E93",
    700: "#3A3A3C",
    900: "#1C1C1E",
  },
  status: { success: "#34C759", warning: "#FF9500", error: "#FF3B30" },
  white: "#FFFFFF",
  black: "#000000",
};

export const typography = {
  family: { main: "System", mono: "Menlo-Regular" },
  size: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, huge: 34 },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export const spacing = { 0: 0, 4: 4, 8: 8, 12: 12, 16: 16, 24: 24, 32: 32 };
export const borderRadius = { none: 0, sm: 8, md: 12, lg: 16, full: 9999 };
