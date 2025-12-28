import { family, size, lineHeight, weight, letterSpacing, variant } from "../tokens";
export const Text = {
  /** 登录页品牌名 */
  heading: {
    fontFamily: family.base,
    fontSize: size.xxxl,
    lineHeight: lineHeight.xxxl,
    fontWeight: weight.bold,
    letterSpacing: letterSpacing.xxxl,
  },
  /** 页面级标题：导航栏标题、个人中心用户名 */
  title: {
    fontFamily: family.base,
    fontSize: size.xxl,
    lineHeight: lineHeight.xxl,
    fontWeight: weight.bold,
  },
  /** 模块级标题：卡片标题、弹窗标题,登录页副标题 */
  subheading: {
    fontFamily: family.base,
    fontSize: size.xl,
    lineHeight: lineHeight.xl,
    fontWeight: weight.medium,
  },
  /** 标准正文：聊天消息内容、文章段落。App 中使用率最高 */
  body: {
    fontFamily: family.base,
    fontSize: size.md,
    lineHeight: lineHeight.md,
    fontWeight: weight.regular,
  },
  /** 强调正文：用于正文中需要加粗突出的信息 */
  bodyStrong: {
    fontFamily: family.base,
    fontSize: size.md,
    lineHeight: lineHeight.md,
    fontWeight: weight.bold,
  },
  /** 表单与标签：按钮文字、输入框 Label、底部 Tab 文字 */
  label: {
    fontFamily: family.base,
    fontSize: size.sm,
    lineHeight: lineHeight.sm,
    fontWeight: weight.medium,
  },
  /** 辅助小字：消息时间戳、表单底部声明、灰色提示文字 */
  caption: {
    fontFamily: family.base,
    fontSize: size.xs,
    lineHeight: lineHeight.xs,
    fontWeight: weight.regular,
  },
  /** 装饰性小标：用于全大写分类标签，具有较明显的字间距 */
  overline: {
    fontFamily: family.base,
    fontSize: size.xs,
    lineHeight: lineHeight.xs,
    fontWeight: weight.bold,
    letterSpacing: 1.2,
  },
  /** 等宽数字：专门用于余额、倒计时、金融账单 */
  numeric: {
    fontFamily: family.numeric,
    fontSize: size.xl,
    lineHeight: lineHeight.xl,
    fontWeight: weight.bold,
    fontVariant: variant.numeric,
  },
};
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string | number;
  letterSpacing?: number;
  fontVariant?: string[];
}
