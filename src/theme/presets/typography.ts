import { family, size, letterSpacing, variant } from "../tokens";
export const Text = {
  brand: {
    fontFamily: family.base,
    fontSize: size.xxl,
    letterSpacing: letterSpacing.xxxl,
  },
  heading: {
    fontFamily: family.base,
    fontSize: size.xl,
    letterSpacing: letterSpacing.xxxl,
  },
  main: {
    fontFamily: family.base,
    fontSize: size.md,
  },
  caption: {
    fontFamily: family.base,
    fontSize: size.xs,
  },
  numeric: {
    fontFamily: family.numeric,
    fontSize: size.xl,
    fontVariant: variant.numeric,
  },
};
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  letterSpacing?: number;
  fontVariant?: string[];
}
