import styled, { css, useTheme } from "styled-components/native";
import IconFont from "@/assets/font/iconfont";
import { BaseInput } from "@/components";
import { t } from "i18next";
import { Icon } from "@/constants";

const Container = styled.View`
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

const InputBox = styled.View`
  flex: 1;
  justify-content: center;
`;

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
}

export function SearchEntry({ keyword, setKeyword }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <SearchContent>
        <IconBox>
          <IconFont name={Icon.search} size={theme.typography.size.md} color={theme.colors.secondaryWord} />
        </IconBox>
        <InputBox>
          <BaseInput
            $size="sm"
            value={keyword}
            onChangeText={setKeyword}
            placeholder={t("chat.search_sessions")}
            placeholderTextColor={theme.colors.secondaryWord}
          />
        </InputBox>
      </SearchContent>
    </Container>
  );
}
