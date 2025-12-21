import React, { memo } from "react";
import { StatusBar, ViewProps, ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavBarProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: ViewStyle;
  bgColor?: string;
  top?: number;
}

const Root = styled.View<{ bgColor?: string }>`
  flex: 1;
  background-color: ${props => props.bgColor || props.theme.colors.background};
`;

const NavBarContainer = styled.View<{ bgColor?: string; top?: number }>`
  height: 56;
  background-color: ${props => props.bgColor || props.theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${props => props.theme.typography.size.md};
  padding-top: ${props => props.top ?? 0};
  position: relative;
  z-index: 10;
`;

const NavTitle = styled.Text`
  font-size: ${props => props.theme.typography.size.md};
  font-weight: 700;
  color: ${props => props.theme.colors.text.main};
  flex: 1;
  text-align: center;
  z-index: 0;
  margin-horizontal: ${props => props.theme.typography.size.md};
`;

const SideBar = styled.View<{ align?: "flex-start" | "flex-end" }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.align || "flex-start"};
  z-index: 1;
`;

const MemoizedNavBar = memo(({ title, left, right, style, bgColor, top }: NavBarProps) => (
  <NavBarContainer style={style} bgColor={bgColor} top={top}>
    <SideBar align="flex-start">{left}</SideBar>
    <NavTitle numberOfLines={1}>{title}</NavTitle>
    <SideBar align="flex-end">{right}</SideBar>
  </NavBarContainer>
));

interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  darkIcons?: boolean;
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerTranslucent?: boolean;
  statusBarTranslucent?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({
  children,
  backgroundColor,
  headerBackgroundColor,
  darkIcons,
  title,
  headerLeft,
  headerRight,
  statusBarTranslucent = false,
  headerTranslucent = false,
  ...props
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDarkTheme = theme.mode === "dark";
  const barStyle =
    darkIcons !== undefined
      ? darkIcons
        ? "dark-content"
        : "light-content"
      : isDarkTheme
        ? "light-content"
        : "dark-content";

  const navBarStyle: ViewStyle = headerTranslucent
    ? { position: "absolute", top: insets.top, left: 0, right: 0, backgroundColor: "transparent" }
    : {};
  console.log("navBarStyle", navBarStyle);
  const finalBgColor = backgroundColor ?? theme.colors.background;
  const navBarBgColor = headerBackgroundColor ?? finalBgColor;
  return (
    <Root bgColor={finalBgColor} {...props}>
      <StatusBar backgroundColor={navBarBgColor} translucent={statusBarTranslucent} barStyle={barStyle} animated />

      {title !== undefined && (
        <MemoizedNavBar
          title={title}
          left={headerLeft}
          right={headerRight}
          bgColor={navBarBgColor}
          top={insets.top}
          style={navBarStyle}
        />
      )}
      {children}
    </Root>
  );
};
