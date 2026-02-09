import React from "react";
import { ViewProps, Platform } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Content = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding-top: ${props => props.paddingTop}px;
`;

interface MainProps extends ViewProps {
  hasHeader?: boolean;
}

export const Main: React.FC<MainProps> = ({ children, hasHeader = false, style }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = hasHeader ? theme.spacing.layout.navBarHeight + insets.top : insets.top;

  return (
    <MainContainer behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Content paddingTop={paddingTop} style={style}>
        {children}
      </Content>
    </MainContainer>
  );
};
