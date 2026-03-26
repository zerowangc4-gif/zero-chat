import styled from "styled-components/native";
import { Typography } from "@/components";

const IntroSectionContainer = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
  gap: ${props => props.theme.spacing.step.xs}px;
`;

interface IntroSectionProps {
  title: string;
  tagline: string;
  color: string;
}
export const IntroSectionComponent = (props: IntroSectionProps) => {
  return (
    <IntroSectionContainer>
      <Typography type="heading" weight="bold">
        {props.title}
      </Typography>
      <Typography color={props.color}>{props.tagline}</Typography>
    </IntroSectionContainer>
  );
};
