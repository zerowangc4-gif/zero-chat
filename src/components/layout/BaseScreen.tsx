import React from "react";
import { StatusBar, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootContainer = styled.View<{ bgColor: string }>`
  flex: 1;
  background-color: ${props => props.bgColor};
`;

const Header = styled.View<{ height: number; paddingTop: number; bgColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.height}px;
  padding-top: ${props => props.paddingTop}px;
  background-color: ${props => props.bgColor};
`;

const HeaderContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderContentLeft = styled.View`
  width: ${props => props.theme.layout.headerLeftAndRightWidth}px;
  padding-left: ${props => props.theme.layout.screenPadding}px;
`;
const HeaderContentCenter = styled.Text`
  flex: 1;
  font-size: ${props => props.theme.typography.presets.navTitle.size}px;
  font-weight: ${props => props.theme.typography.presets.navTitle.weight}px;
  text-align: center;
`;
const HeaderContentRight = styled.View`
  width: ${props => props.theme.layout.headerLeftAndRightWidth}px;
  padding-right: ${props => props.theme.layout.screenPadding}px;
`;
const MainContent = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding-top: ${props => props.paddingTop}px;
`;
interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
}

export const BaseScreen: React.FC<Props> = ({ children, backgroundColor, title }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDarkTheme = theme.mode === "dark";
  const barStyle = isDarkTheme ? "light-content" : "dark-content";
  const finalBgColor = backgroundColor ?? theme.colors.background;
  const navBarHeight = theme.layout.navBarHeight + insets.top;
  return (
    <RootContainer bgColor={finalBgColor}>
      <StatusBar translucent barStyle={barStyle} animated />
      <Header height={title ? navBarHeight : insets.top} paddingTop={title ? insets.top : 0} bgColor={finalBgColor}>
        {title && (
          <HeaderContent>
            <HeaderContentLeft />
            <HeaderContentCenter>{title}</HeaderContentCenter>
            <HeaderContentRight />
          </HeaderContent>
        )}
      </Header>
      <MainContent paddingTop={title ? navBarHeight : insets.top}>{children}</MainContent>
    </RootContainer>
  );
};
