import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "./Typography";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      background-color: ${theme.palette.brand};
      padding: ${theme.spacing.step.xs}px;
      border-radius: ${theme.radii.scale.md}px;
    `;
  }}
`;

interface Props {
  label: string;
  onPress: () => void;
}

export function HeaderTextAction({ label, onPress }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <Typography type="caption" color={theme.colors.base}>
        {label}
      </Typography>
    </Container>
  );
}
