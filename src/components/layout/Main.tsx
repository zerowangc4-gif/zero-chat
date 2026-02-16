import React, { useEffect, useState } from "react";
import { ViewProps, Platform, Keyboard, LayoutAnimation } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainContainer = styled.View`
  flex: 1;
`;

const Content = styled.View<{ $paddingTop: number; $bottom: number }>`
  flex: 1;
  padding-top: ${props => props.$paddingTop}px;
  padding-bottom: ${props => props.$bottom}px;
`;

interface MainProps extends ViewProps {
  hasHeader?: boolean;
  enableKeyboardAvoiding?: boolean;
}

export const Main: React.FC<MainProps> = ({ children, hasHeader = false, enableKeyboardAvoiding = false, style }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const paddingTop = hasHeader ? theme.spacing.layout.navBarHeight + insets.top : insets.top;

  useEffect(() => {
    if (!enableKeyboardAvoiding) {
      setKeyboardHeight(0);
      return;
    }

    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, e => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [enableKeyboardAvoiding]);

  return (
    <MainContainer>
      <Content $paddingTop={paddingTop} $bottom={keyboardHeight} style={style}>
        {children}
      </Content>
    </MainContainer>
  );
};
