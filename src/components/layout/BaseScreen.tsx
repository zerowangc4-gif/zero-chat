import React from "react";
import { StatusBar, StyleSheet, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "../common/Typography";
import { ThemeType } from "@/theme";

const RootContainer = styled.View<{ bgColor: string }>`
  flex: 1;
  background-color: ${props => props.bgColor};
`;

const Header = styled.View<{ height: number; paddingTop: number; bgColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: ${props => props.height}px;
  padding-top: ${props => props.paddingTop}px;
  background-color: ${props => props.bgColor};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${props => props.theme.colors.borderBase};
`;

const HeaderContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
  padding-right: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
`;

const HeaderContentLeft = styled.View`
  width: ${props => props.theme.spacing.layout.headerLeftAndRightWidth}px;
  flex-direction: row;
  align-items: center;
`;
const NavTitle = styled(Typography)`
  flex: 1;
  text-align: center;
`;
const HeaderContentRight = styled.View`
  width: ${props => props.theme.spacing.layout.headerLeftAndRightWidth}px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MainContent = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding-top: ${props => props.paddingTop}px;
  padding-left: 24px;
  padding-right: 24px;
`;

interface BaseScreenProps extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  headerColor?: string;
  extendToTop?: boolean;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  backgroundColor,
  title,
  leftComponent,
  rightComponent,
  headerColor,
  extendToTop = false,
  ...rest
}) => {
  const theme = useTheme() as ThemeType;
  const insets = useSafeAreaInsets();

  const finalBgColor = backgroundColor ?? theme.colors.bgPage;
  const headerBgColor = headerColor ?? finalBgColor;

  const barStyle = theme.isDark ? "light-content" : "dark-content";

  const navBarHeight = theme.spacing.layout.navBarHeight;
  const totalHeaderHeight = title || leftComponent || rightComponent ? navBarHeight + insets.top : insets.top;
  //如果是穿透模式，paddingTop 设为 0 内容穿过导航栏
  const mainPaddingTop = extendToTop ? insets.top : totalHeaderHeight;

  return (
    <RootContainer bgColor={finalBgColor} {...rest}>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" animated />

      <Header height={totalHeaderHeight} paddingTop={insets.top} bgColor={headerBgColor}>
        {(title || leftComponent || rightComponent) && (
          <HeaderContent>
            <HeaderContentLeft>{leftComponent}</HeaderContentLeft>

            <NavTitle type="title" numberOfLines={1}>
              {title}
            </NavTitle>
            <HeaderContentRight>{rightComponent}</HeaderContentRight>
          </HeaderContent>
        )}
      </Header>

      <MainContent paddingTop={mainPaddingTop}>{children}</MainContent>
    </RootContainer>
  );
};
