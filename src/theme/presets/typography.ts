import { typography } from "../tokens";
export const Text = {
  brand: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xxl,
    letterSpacing: typography.letterSpacing.xxxl,
  },
  heading: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xl,
    letterSpacing: typography.letterSpacing.xxxl,
  },
  subheading: {
    fontFamily: typography.family.base,
    fontSize: typography.size.lg,
  },
  main: {
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
  },
  caption: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xs,
  },
  numeric: {
    fontFamily: typography.family.numeric,
    fontSize: typography.size.xl,
    fontVariant: typography.variant.numeric,
  },
};
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  letterSpacing?: number;
  fontVariant?: string[];
  lineHeight?: number;
}
