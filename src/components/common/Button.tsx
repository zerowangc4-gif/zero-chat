import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: StyleProp<ViewStyle>;
}

const ButtonContainer = styled.TouchableOpacity<{ variant?: "primary" | "secondary" | "outline" }>`
  height: 50px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${props => {
    if (props.variant === "secondary") return props.theme.colors.surface;
    if (props.variant === "outline") return "transparent";
    return props.theme.colors.primary;
  }};
  border: ${props =>
    props.variant === "outline" ? `1px solid ${props.theme.colors.primary}` : "none"};
`;

const ButtonLabel = styled.Text<{ variant?: "primary" | "secondary" | "outline" }>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => {
    if (props.variant === "secondary") return props.theme.colors.text.main;
    if (props.variant === "outline") return props.theme.colors.primary;
    return "#FFFFFF";
  }};
`;

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = "primary", style }) => (
  <ButtonContainer onPress={onPress} variant={variant} style={style} activeOpacity={0.7}>
    <ButtonLabel variant={variant}>{title}</ButtonLabel>
  </ButtonContainer>
);
