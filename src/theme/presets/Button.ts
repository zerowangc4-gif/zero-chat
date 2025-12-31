import { Platform } from "react-native";

export type Size = "sm" | "md" | "lg";
export const Button = {
  sm: {
    fontSize: 12,
    borderRadius: 4,
    height: 40,
    fontweight: {
      regular: "400",
      semibold: "600",
      bold: Platform.OS === "ios" ? "700" : "bold",
    },
  },
  md: {
    fontSize: 16,
    borderRadius: 4,
    height: 48,
    fontweight: {
      regular: "400",
      semibold: "600",
      bold: Platform.OS === "ios" ? "700" : "bold",
    },
  },
  lg: {
    fontSize: 16,
    borderRadius: 4,
    height: 44,
    fontweight: {
      regular: "400",
      semibold: "600",
      bold: Platform.OS === "ios" ? "700" : "bold",
    },
  },
};
