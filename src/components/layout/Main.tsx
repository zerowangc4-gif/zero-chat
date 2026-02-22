import React from "react";
import { ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View<{ $paddingTop: number }>`
  flex: 1;
  padding-top: ${props => props.$paddingTop}px;
`;
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

interface MainProps extends ViewProps {
  hasHeader?: boolean;
  enableKeyboardAvoiding?: boolean;
}

export const Main: React.FC<MainProps> = ({ children, hasHeader = false, enableKeyboardAvoiding = false, style }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const paddingTop = hasHeader ? theme.spacing.layout.navBarHeight + insets.top : insets.top;

  if (!enableKeyboardAvoiding) {
    return (
      <Container>
        <Content $paddingTop={paddingTop} style={style}>
          {children}
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <StyledKeyboardAvoidingView behavior="padding">
        <Content $paddingTop={paddingTop} style={style}>
          {children}
        </Content>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};
