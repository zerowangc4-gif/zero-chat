import styled, { css, useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { Typography } from "@/components";
import { t } from "i18next";
import { Props } from "./ChatList";

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

export function SearchEntry({ handleAddFriend }: Pick<Props, "handleAddFriend">) {
  const theme = useTheme();
  return (
    <Container onPress={handleAddFriend}>
      <SearchContent>
        <IconBox>
          <IconFont name="sousuo" size={theme.typography.size.md} color={theme.colors.secondaryWord} />
        </IconBox>
        <Typography type="main" color={theme.colors.secondaryWord}>
          {t("chat.placeholder_search_address")}
        </Typography>
      </SearchContent>
    </Container>
  );
}
