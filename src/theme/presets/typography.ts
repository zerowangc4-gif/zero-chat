import { family, size, weight, letterSpacing, variant } from "../tokens";
export const Text = {
  /** 登录页品牌名 */
  heading: {
    fontFamily: family.base,
    fontSize: size.xxl,
    fontWeight: weight.bold,
    letterSpacing: letterSpacing.xxxl,
  },
  /** 标准正文：聊天消息内容、文章段落。App 中使用率最高 */
  body: {
    fontFamily: family.base,
    fontSize: size.md,
    fontWeight: weight.regular,
  },
  caption: {
    fontFamily: family.base,
    fontSize: size.xs,
    fontWeight: weight.regular,
  },
  /** 等宽数字：专门用于余额、倒计时、金融账单 */
  numeric: {
    fontFamily: family.numeric,
    fontSize: size.xl,
    fontWeight: weight.bold,
    fontVariant: variant.numeric,
  },
};
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  letterSpacing?: number;
  fontVariant?: string[];
}
