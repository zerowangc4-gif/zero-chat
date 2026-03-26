import styled from "styled-components/native";
import { Typography } from "@/components";

const SeedCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.step.sm}px;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
`;

const WordItem = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.size.sm}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.borderColor};
  background-color: ${props => props.theme.colors.fillSecondary};
  border-radius: ${props => props.theme.radii.scale.md}px;
`;
export const SeedCard = ({ words }: { words: string[] }) => {
  return (
    <SeedCardContainer>
      {words.map((word: string, index: number) => (
        <WordItem key={`${word}-${index}`}>
          <Typography type="main">{word}</Typography>
        </WordItem>
      ))}
    </SeedCardContainer>
  );
};
