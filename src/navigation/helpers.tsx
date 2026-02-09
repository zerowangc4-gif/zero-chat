import IconFont, { IconNames } from "@/assets/font/iconfont";
import { useMemo } from "react";

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export function TabIcon(name: IconNames) {
  return useMemo(() => {
    return function TabBarIcon(props: TabBarIconProps) {
      return <IconFont name={name} {...props} />;
    };
  }, [name]);
}
