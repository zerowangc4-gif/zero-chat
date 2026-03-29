import styled, { css } from "styled-components/native";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      height: 200px;
      background-color: ${theme.colors.base};
    `;
  }}
`;

export function SearchResultCard() {
  return <Container />;
}
