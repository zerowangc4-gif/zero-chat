import React from "react";
import styled, { useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { PressableProps } from "react-native";

// 使用 styled.Pressable 定义基础容器
const IconContainer = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

interface AgreeButtonProps extends PressableProps {
  checked: boolean;
}

export function AgreeButton({ checked, onPress, ...props }: AgreeButtonProps) {
  const theme = useTheme();
  return (
    <IconContainer
      {...props}
      onPress={onPress}
      hitSlop={20}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}>
      <IconFont
        name={checked ? "duihao1" : "weixuanzhongyuanquan"}
        size={16}
        color={checked ? theme.colors.primary : theme.colors.textPrimary}
      />
    </IconContainer>
  );
}
