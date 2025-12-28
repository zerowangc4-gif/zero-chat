/** 物理圆角阶梯 (Scale) */
const scale = { none: 0, xs: 2, sm: 4, md: 8, lg: 12, xl: 20, full: 999 };

/** 语义化预设 (Presets) */
const preset = {
  /** 方角 */
  none: scale.none,
  /** 极小圆角：Checkbox 勾选框、微型指示器 */
  element: scale.xs,
  /** 小圆角：Badge 徽标、小标签 Tag */
  tag: scale.sm,
  /** 标准圆角：聊天气泡、输入框、普通按钮、设置项单元格 */
  component: scale.md,
  /** 大圆角：功能模块卡片、大型弹窗容器 */
  container: scale.lg,
  /** 浮层圆角：底部滑出的 ActionSheet、侧边栏顶部 */
  overlay: scale.xl,
  /** 彻底圆形：头像、胶囊形 SearchBar、药丸按钮 */
  circle: scale.full,
} as const;

export const radii = {
  scale,
  preset,
} as const;
