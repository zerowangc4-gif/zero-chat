import styled, { useTheme } from "styled-components/native";
import { t } from "i18next";
import { BaseScreen, Main } from "@/components";
import { LoginIntroSection, InputAndShowMnemonic, Footer } from "../components";
import { useReLogin } from "../hooks";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.xl}px;
  padding-right: ${props => props.theme.spacing.step.xl}px;
`;

export function ReLogin() {
  const theme = useTheme();

  const {
    mnemonic,
    mnemonics,
    handleIdentifyQRCode,
    handleSaveMnemonic,
    handleRemoveMnemonic,
    handleReLogin,
    filledCount,
  } = useReLogin();

  return (
    <BaseScreen>
      <MainContent hasHeader={false}>
        <LoginIntroSection handleIdentifyQRCode={handleIdentifyQRCode} />
        <InputAndShowMnemonic
          mnemonic={mnemonic}
          mnemonics={mnemonics}
          handleSaveMnemonic={handleSaveMnemonic}
          handleRemoveMnemonic={handleRemoveMnemonic}
          filledCount={filledCount}
        />
      </MainContent>
      <Footer
        data={[
          {
            title: t("auth.action_claim_identity"),
            bgColor: theme.colors.baseInverse,
            disabled: filledCount !== 12,
            onPress: handleReLogin,
          },
        ]}
      />
    </BaseScreen>
  );
}
