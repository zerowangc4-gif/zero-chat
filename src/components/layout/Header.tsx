import React from "react";
import { StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Typography } from "../common/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconFont, { IconNames } from "@/assets/font/iconfont";
const HeaderContainer = styled.View<{ height: number; paddingTop: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: ${props => props.height}px;
  padding-top: ${props => props.paddingTop}px;
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
interface HeaderProps {
  title?: string;
  leftIcon?: IconNames;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, rightComponent }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const height = theme.spacing.layout.navBarHeight + insets.top;
  return (
    <HeaderContainer height={height} paddingTop={insets.top}>
      <HeaderContent>
        <HeaderContentLeft>
          <IconFont name="xiangzuojiantou" size={20} color={theme.colors.iconColor} />
        </HeaderContentLeft>
        <NavTitle numberOfLines={1}>{title}</NavTitle>
        <HeaderContentRight>{rightComponent}</HeaderContentRight>
      </HeaderContent>
    </HeaderContainer>
  );
};
