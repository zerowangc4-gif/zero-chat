import styled, { css, useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
const Container = styled.Pressable`
  ${({ theme }) => css`
    width: ${theme.size.ms}px;
    height: ${theme.size.ms}px;
    justify-content: center;
    align-items: center;
  `}
`;

interface Props {
  handleShowMeMenu: () => void;
}
export function MeRightAction({ handleShowMeMenu }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={handleShowMeMenu}>
      <IconFont name={Icon.menu} size={theme.typography.size.md} color={theme.colors.baseInverse} />
    </Container>
  );
}
