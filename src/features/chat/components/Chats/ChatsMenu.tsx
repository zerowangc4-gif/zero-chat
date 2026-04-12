import styled, { css, useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconFont, { IconNames } from "@/assets/font/iconfont";

import { Typography } from "@/components";

const Container = styled.View<{ $top: number }>`
  ${({ theme, $top }) => {
    return css`
      position: absolute;
      right: ${theme.spacing.step.xs}px;
      top: ${theme.spacing.layout.navBarHeight + $top}px;
      border-radius: ${theme.radii.scale.md}px;
      background-color: ${theme.colors.surfaceBg};
      overflow: hidden;
      z-index: 101;
    `;
  }}
`;

const ChatsMenuItem = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      padding-right: ${theme.spacing.step.md}px;
    `;
  }}
`;

const IconFontWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding: ${theme.typography.size.md}px;
    `;
  }}
`;

const ChatsMenuItemText = styled.View``;

interface ItemProps {
  iconName: IconNames;
  text: string;
  onPress: () => void;
}
export function ChatsMenu({ menuItems }: { menuItems: ItemProps[] }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Container style={theme.shadows.low} $top={insets.top + theme.spacing.step.xxs}>
      {menuItems.map((item: ItemProps) => {
        return (
          <ChatsMenuItem
            key={item.text}
            onPress={item.onPress}
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
              opacity: pressed ? theme.interactive.activeOpacity : 1,
            })}>
            <IconFontWrapper>
              <IconFont name={item.iconName} size={theme.typography.size.md} color={theme.colors.baseInverse} />
            </IconFontWrapper>
            <ChatsMenuItemText>
              <Typography>{item.text}</Typography>
            </ChatsMenuItemText>
          </ChatsMenuItem>
        );
      })}
    </Container>
  );
}
