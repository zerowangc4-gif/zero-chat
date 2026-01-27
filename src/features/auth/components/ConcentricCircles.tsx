import React from "react";
import styled, { useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";

const CONFIG = {
  containerHeight: 300,
  iconBoxSize: 96,
  iconBoxRadius: 24,
  ringBaseSize: 136,
  ringStep: 40,
  ringBorderWidth: 1.5,
};

const Container = styled.View`
  width: 100%;
  height: ${CONFIG.containerHeight}px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const OrbitRing = styled.View<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: ${CONFIG.ringBorderWidth}px;
  border-color: ${props => props.color};
  border-style: solid;
`;

const IconContainer = styled.View`
  width: ${CONFIG.iconBoxSize}px;
  height: ${CONFIG.iconBoxSize}px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${CONFIG.iconBoxRadius}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.palette.gray[100]};
`;

export const ConcentricCircles = () => {
  const { colors } = useTheme();

  const ringPalette = [colors.ringDeep, colors.ringMedium, colors.ringLight, colors.ringFaint];

  return (
    <Container>
      {ringPalette.map((color, index) => (
        <OrbitRing key={`ring-${index}`} color={color} size={CONFIG.ringBaseSize + index * CONFIG.ringStep} />
      ))}

      <IconContainer>
        <IconFont name="daoban-copy" size={48} />
      </IconContainer>
    </Container>
  );
};
