import React from "react";
import { StatusBar, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";

const RootContainer = styled.View<{ bgColor: string }>`
  flex: 1;
  background-color: ${props => props.bgColor};
`;

interface BaseScreenProps extends ViewProps {
  children: React.ReactNode;
  bgColor?: string;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({ children, bgColor }) => {
  const theme = useTheme();

  const barStyle = theme.isDark ? "light-content" : "dark-content";

  return (
    <RootContainer bgColor={bgColor ?? theme.colors.bgPage}>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" animated />
      {children}
    </RootContainer>
  );
};
