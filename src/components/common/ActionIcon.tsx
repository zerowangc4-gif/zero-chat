import IconFont, { IconNames } from "@/assets/font/iconfont";
import { useApp } from "@/hooks";
import { Pressable } from "react-native";

interface Props {
  size: number;
  name: IconNames;
  color?: string;
  onPress?: () => void;
}
export function ActionIcon({ size, name, color, onPress }: Props) {
  const { theme } = useApp();
  const gap = theme.typography.size.xs;
  const iconFontColor = color || theme.colors.secondaryWord;
  return (
    <Pressable onPress={onPress} hitSlop={{ top: gap, bottom: gap, left: gap, right: gap }}>
      <IconFont name={name} size={size} color={iconFontColor} />
    </Pressable>
  );
}
