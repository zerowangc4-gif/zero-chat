import styled, { css, useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
const HeaderActionContainer = styled.Pressable`
  ${({ theme }) => css`
    width: ${theme.size.ms}px;
    height: ${theme.size.ms}px;
    border-radius: ${theme.size.ms / 2}px;
    background-color: ${theme.colors.fillSecondary};
    justify-content: center;
    align-items: center;
  `}
`;
interface Props {
  handleShowChatsMenu: () => void;
}
export function HeaderAction({ handleShowChatsMenu }: Props) {
  const theme = useTheme();
  return (
    <HeaderActionContainer onPress={handleShowChatsMenu}>
      <IconFont name={Icon.add} size={theme.typography.size.md} color={theme.colors.baseInverse} />
    </HeaderActionContainer>
  );
}
