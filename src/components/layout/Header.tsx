import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Typography } from "../common/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const HeaderContainer = styled.View<{ height: number; paddingTop: number; hasContent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: ${props => props.height}px;
  padding-top: ${props => props.paddingTop}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.divider};
  background-color: ${props => (props.hasContent ? props.theme.colors.base : props.theme.colors.bgPage)};
`;
const HeaderContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: ${props => props.theme.spacing.step.md}px;
  padding-right: ${props => props.theme.spacing.step.md}px;
`;

const NavTitle = styled(Typography)`
  flex: 1;
  text-align: center;
`;

const SideSlot = styled.View<{ $align: "left" | "right" }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.$align === "left" ? "flex-start" : "flex-end")};
`;

interface HeaderProps {
  title?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, leftElement, rightElement }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const height = theme.spacing.layout.navBarHeight + insets.top;
  const hasContent = title || leftElement || rightElement;
  return (
    <HeaderContainer height={height} paddingTop={insets.top} hasContent={hasContent}>
      <HeaderContent>
        <SideSlot $align="left">{leftElement}</SideSlot>
        <NavTitle numberOfLines={1}>{title}</NavTitle>
        <SideSlot $align="right">{rightElement}</SideSlot>
      </HeaderContent>
    </HeaderContainer>
  );
};
