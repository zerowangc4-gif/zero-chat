import React from "react";
import { ViewProps, Platform } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const StyledScrollView = styled.ScrollView.attrs(() => ({
  // 确保内容不满一屏时也能触发弹性（可选）
  contentContainerStyle: { flexGrow: 1 },
  // 点击空白处收起键盘，这是大厂 UI 体验的标配
  keyboardShouldPersistTaps: "handled",
}))`
  flex: 1;
`;

const ScrollInner = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding-top: ${props => props.paddingTop}px;
`;

interface MainProps extends ViewProps {
  hasHeader?: boolean;
}

export const Main: React.FC<MainProps> = ({ children, hasHeader = false, style }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  console.log(insets);

  const paddingTop = hasHeader ? theme.spacing.layout.navBarHeight + insets.top : insets.top;

  return (
    <MainContainer behavior={Platform.OS === "ios" ? "padding" : undefined} style={style}>
      <StyledScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ScrollInner paddingTop={paddingTop}>{children}</ScrollInner>
      </StyledScrollView>
    </MainContainer>
  );
};
