import styled from "styled-components/native";
import { Typography, Main } from "@/components";
import { ConcentricCircles } from "./ConcentricCircles";

const HeroSectionContainer = styled(Main)`
  padding-top: ${props => props.theme.spacing.layout.homeTop}px;
`;

const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.step.md}px;
  gap: ${props => props.theme.spacing.step.sm}px;
`;
interface HeroSectionProps {
  brand: string;
  slogan: string;
  color: string;
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <HeroSectionContainer>
      <ConcentricCircles />
      <WelcomeMessage>
        <Typography type="brand" weight="bold">
          {props.brand}
        </Typography>
        <Typography color={props.color}>{props.color}</Typography>
      </WelcomeMessage>
    </HeroSectionContainer>
  );
};
