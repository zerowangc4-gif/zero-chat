import styled, { css } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { Typography } from "@/components";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      height: ${theme.size.lg}px;
      justify-content: center;
      padding-left: ${theme.spacing.step.md}px;
      padding-right: ${theme.spacing.step.md}px;
      background-color: ${theme.colors.base};
    `;
  }}
`;

const SearchContent = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      height: ${theme.size.sm}px;
      border-radius: ${theme.size.sm}px;
      align-items: center;
      background-color: ${theme.colors.fillSecondary};
    `;
  }}
`;
const IconBox = styled.View`
  ${({ theme }) => {
    return css`
      padding-left: ${theme.spacing.step.md}px;
      padding-right: ${theme.spacing.step.md}px;
    `;
  }}
`;

export function SearchEntry({ theme, searchContactPlaceholder, onPress }) {
  return (
    <Container onPress={onPress}>
      <SearchContent>
        <IconBox>
          <IconFont name="sousuo" size={theme.typography.size.md} color={theme.colors.secondaryWord} />
        </IconBox>
        <Typography type="main" color={theme.colors.secondaryWord}>
          {searchContactPlaceholder}
        </Typography>
      </SearchContent>
    </Container>
  );
}
