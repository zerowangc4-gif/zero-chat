import styled, { css, useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
const HeaderActionContainer = styled.View`
  ${({ theme }) => css`
    width: ${theme.size.ms}px;
    height: ${theme.size.ms}px;
    border-radius: ${theme.size.ms / 2}px;
    background-color: ${theme.colors.fillSecondary};
    justify-content: center;
    align-items: center;
  `}
`;

export function HeaderAction() {
  const theme = useTheme();
  return (
    <HeaderActionContainer>
      <IconFont name={Icon.add} size={theme.typography.size.md} color={theme.colors.baseInverse} />
    </HeaderActionContainer>
  );
}
