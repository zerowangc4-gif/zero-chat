import styled, { css } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { size } from "./AccountInfo";
import { useApp } from "@/hooks";

const HeaderActionContainer = styled.View`
  ${({ theme }) => css`
    width: ${size.normal}px;
    height: ${size.normal}px;
    border-radius: ${size.normal / 2}px;
    background-color: ${theme.colors.fillSecondary};
    justify-content: center;
    align-items: center;
  `}
`;

export function HeaderAction() {
  const { theme } = useApp();
  return (
    <HeaderActionContainer>
      <IconFont name="jiahao1" size={theme.typography.size.md} color={theme.colors.baseInverse} />
    </HeaderActionContainer>
  );
}
