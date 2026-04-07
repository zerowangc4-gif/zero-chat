import styled, { css, useTheme } from "styled-components/native";
import { Input, Button, Typography } from "@/components";
import { InputProps } from "@/features/chat";

const Container = styled.View`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.spacing.step.lg}px;
    `;
  }}
`;

const InputMnemonicWrapper = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      padding-bottom: ${theme.spacing.step.lg}px;
      gap: ${theme.spacing.step.lg}px;
    `;
  }}
`;

const InputWrapper = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      align-items: center;
      background: ${theme.colors.base};
    `;
  }}
`;

const ShowMnemonicWrapper = styled.View`
  ${({ theme }) => {
    return css`
      gap: ${theme.spacing.step.lg}px;
    `;
  }}
`;

const ShowMnemonicWrapperTitle = styled.View`
  ${() => {
    return css`
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
    `;
  }}
`;

const MnemonicContainer = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    `;
  }}
`;

const MnemonicWrapper = styled.Pressable`
  ${({ theme }) => {
    return css`
      width: 30%;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: ${theme.size.sm}px;
      border-width: 1px;
      border-color: ${theme.colors.borderColor};
      background-color: ${theme.colors.fillSecondary};
      border-radius: ${theme.radii.scale.md}px;
      margin-bottom: ${theme.spacing.step.md}px;
      gap: ${theme.spacing.step.sm}px;
    `;
  }}
`;

interface Props {
  mnemonic: InputProps;
  mnemonics: Record<string, string>;
  handleSaveMnemonic: () => void;
}
export const InputAndShowMnemonic = ({ mnemonic, mnemonics, handleSaveMnemonic }: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <InputMnemonicWrapper>
        <InputWrapper>
          <Input placeholder="输入助记词单词" value={mnemonic.value} onChangeText={mnemonic.onChange} />
        </InputWrapper>
        <Button title="保存" block={false} onPress={handleSaveMnemonic} bgColor={theme.colors.baseInverse} />
      </InputMnemonicWrapper>
      <ShowMnemonicWrapper>
        <ShowMnemonicWrapperTitle>
          <Typography type="subheading" weight="bold">
            助记词列表
          </Typography>
          <Typography color={theme.colors.secondaryWord}>0/12 words</Typography>
        </ShowMnemonicWrapperTitle>
        <MnemonicContainer>
          {Object.entries(mnemonics).map(([key, value]) => (
            <MnemonicWrapper key={key}>
              <Typography color={theme.colors.secondaryWord}>{key}.</Typography>

              <Typography color={theme.colors.secondaryWord}>{value || "待填充"}</Typography>
            </MnemonicWrapper>
          ))}
        </MnemonicContainer>
      </ShowMnemonicWrapper>
    </Container>
  );
};
