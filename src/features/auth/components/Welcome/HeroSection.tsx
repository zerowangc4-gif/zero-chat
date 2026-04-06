import styled, { useTheme } from "styled-components/native";
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
}

export const HeroSection = (props: HeroSectionProps) => {
  const theme = useTheme();
  return (
    <HeroSectionContainer>
      <ConcentricCircles />
      <WelcomeMessage>
        <Typography type="brand" weight="bold">
          {props.brand}
        </Typography>
        <Typography color={theme.colors.secondaryWord}>{props.slogan}</Typography>
      </WelcomeMessage>
    </HeroSectionContainer>
  );
};
