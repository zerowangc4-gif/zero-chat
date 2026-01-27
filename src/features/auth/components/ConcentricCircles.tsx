import React from "react";
import styled, { useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";

const Container = styled.View`
  width: 100%;
  height: 256px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const DecorateRing = styled.View<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: 2px;
  border-color: ${props => props.color};
  border-style: solid;
`;
const CenterContent = styled.View`
  position: absolute;
`;

const IconContainer = styled.View`
  width: 96px;
  height: 96px;
  background-color: #ffff;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const ConcentricCircles = () => {
  const theme = useTheme();
  const rings = [
    { size: 136, color: theme.colors.ringFaint },
    { size: 176, color: theme.colors.ringLight },
    { size: 216, color: theme.colors.ringMedium },
    { size: 256, color: theme.colors.ringDeep },
  ];

  return (
    <Container>
      {rings.map((item, index) => (
        <DecorateRing key={index} size={item.size} color={item.color} />
      ))}
      <CenterContent>
        <IconContainer>
          <IconFont name="daoban-copy" size={48} />
        </IconContainer>
      </CenterContent>
    </Container>
  );
};
