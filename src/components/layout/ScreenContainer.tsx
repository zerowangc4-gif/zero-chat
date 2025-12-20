import React from "react";
import { StatusBar, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Root = styled.View<{ top: number; bgColor?: string; enableSafeArea: boolean }>`
  flex: 1;
  background-color: ${props => props.bgColor || props.theme.colors.background};
  padding-top: ${props => (props.enableSafeArea ? props.top : 0)}px;
`;

interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  darkIcons?: boolean;
  enableSafeArea?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({
  children,
  backgroundColor,
  statusBarColor = "transparent",
  darkIcons,
  enableSafeArea = true,
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

  return (
    <Root top={insets.top} bgColor={backgroundColor} enableSafeArea={enableSafeArea} {...props}>
      <StatusBar
        backgroundColor={statusBarColor}
        translucent={true}
        barStyle={barStyle}
        animated={true}
      />
      {children}
    </Root>
  );
};
