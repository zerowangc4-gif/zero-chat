import React, { memo } from "react";
import { StatusBar, ViewProps, ViewStyle, Platform } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavBarProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: ViewStyle;
}

const Root = styled.View<{ top: number; bgColor?: string; enableSafeArea: boolean }>`
  flex: 1;
  background-color: ${props => props.bgColor || props.theme.colors.background};
  padding-top: ${props => {
    if (!props.enableSafeArea) return 0;
    return Platform.OS === "ios" ? props.top : 0;
  }}px;
`;

const NavBarContainer = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  position: relative;
  z-index: 10;
`;

const NavTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.text.main};
  position: absolute;
  left: 70px;
  right: 70px;
  text-align: center;
  z-index: 0;
`;

const SideBar = styled.View<{ align?: "flex-start" | "flex-end" }>`
  flex-direction: row;
  align-items: center;
  min-width: 44px;
  min-height: 44px;
  justify-content: ${props => props.align || "flex-start"};
  z-index: 1;
`;

const MemoizedNavBar = memo(({ title, left, right, style }: NavBarProps) => (
  <NavBarContainer style={style}>
    <SideBar align="flex-start">{left}</SideBar>
    <NavTitle numberOfLines={1}>{title}</NavTitle>
    <SideBar align="flex-end">{right}</SideBar>
  </NavBarContainer>
));

interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  darkIcons?: boolean;
  enableSafeArea?: boolean;
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  translucentHeader?: boolean;
  translucent?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({
  children,
  backgroundColor,
  statusBarColor,
  darkIcons,
  enableSafeArea = true,
  title,
  headerLeft,
  headerRight,
  translucentHeader = false,
  translucent = false,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const isDarkTheme = theme.mode === "dark";
  const barStyle =
    darkIcons !== undefined
      ? darkIcons
        ? "dark-content"
        : "light-content"
      : isDarkTheme
        ? "light-content"
        : "dark-content";

  const navBarStyle: ViewStyle = translucentHeader
    ? { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: "transparent" }
    : {};

  const finalBgColor = backgroundColor ?? theme.colors.background;
  const finalStatusBarColor =
    statusBarColor || (Platform.OS === "android" ? finalBgColor : "transparent");
  return (
    <Root top={insets.top} bgColor={finalBgColor} enableSafeArea={enableSafeArea} {...props}>
      <StatusBar
        backgroundColor={finalStatusBarColor}
        translucent={translucent}
        barStyle={barStyle}
        animated
      />

      {title !== undefined && (
        <MemoizedNavBar title={title} left={headerLeft} right={headerRight} style={navBarStyle} />
      )}

      {children}
    </Root>
  );
};
