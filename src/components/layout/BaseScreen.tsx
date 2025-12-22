import React from "react";
import { StatusBar, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootContainer = styled.View<{ bgColor?: string }>`
  flex: 1;
  background-color: ${props => props.bgColor || props.theme.colors.background};
`;

const NavBar = styled.View<{ top: number }>`
  height: ${props => props.top};
  background-color: red;
`;
const MainContent = styled.View`
  flex: 1;
`;
interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const BaseScreen: React.FC<Props> = ({ children, backgroundColor }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDarkTheme = theme.mode === "dark";
  const barStyle = isDarkTheme ? "light-content" : "dark-content";

  const finalBgColor = backgroundColor ?? theme.colors.background;
  return (
    <RootContainer bgColor={finalBgColor}>
      <StatusBar translucent={true} barStyle={barStyle} animated />
      <NavBar top={insets.top} />
      <MainContent>{children}</MainContent>
    </RootContainer>
  );
};
