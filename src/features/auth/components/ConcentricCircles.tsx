import React from "react";
import styled, { useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
/**以8px 为基本单位 */
const step = 8;
const CONFIG = {
  containerHeight: step * 37,
  iconBoxSize: step * 12,
  iconBoxRadius: step * 3,
  ringBaseSize: step * 17,
  ringStep: step * 5,
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
  background-color: ${props => props.theme.colors.base};
  border-radius: ${CONFIG.iconBoxRadius}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.palette.gray[100]};
`;

export const ConcentricCircles = () => {
  const { palette, typography } = useTheme();

  const ringPalette = [palette.gray["300"], palette.gray["200"], palette.gray["100"], palette.white];

  return (
    <Container>
      {ringPalette.map((color, index) => (
        <OrbitRing key={`ring-${index}`} color={color} size={CONFIG.ringBaseSize + index * CONFIG.ringStep} />
      ))}

      <IconContainer>
        <IconFont name="daoban-copy" size={typography.size.xxxl} />
      </IconContainer>
    </Container>
  );
};
