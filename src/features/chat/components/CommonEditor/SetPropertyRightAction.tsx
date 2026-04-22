import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "@/components";
import { t } from "i18next";
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
  handleSetProperty: () => void;
}
export function SetPropertyRightAction({ handleSetProperty }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={handleSetProperty}>
      <Typography type="caption" color={theme.colors.base}>
        {t("chat.next")}
      </Typography>
    </Container>
  );
}
