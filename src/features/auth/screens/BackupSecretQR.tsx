import styled from "styled-components/native";

import { BaseScreen, Header, Main } from "@/components";
import { Footer, SeedCard, ViewShotComponent, IntroSection } from "../components";
import { useBackupSecretQR } from "../hooks";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.xl}px;
  padding-right: ${props => props.theme.spacing.step.xl}px;
`;

export function BackupSecretQR() {
  const { t, theme, words, encryptedMnemonic, handleBackup, viewShotRef } = useBackupSecretQR();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection
          title={t("auth.remember_mnemonic")}
          color={theme.colors.secondaryWord}
          tagline={t("auth.remember_mnemonic_tagline")}
        />
        <SeedCard words={words} />
        <ViewShotComponent
          viewShotRef={viewShotRef}
          title={t("auth.backup_qr_title")}
          size={theme.size.lg}
          mnemonic={encryptedMnemonic}
          helper={t("auth.backup_qr_helper")}
          color={theme.colors.secondaryWord}
        />
      </MainContent>

      <Footer
        data={[
          {
            title: t("auth.action_claim_identity"),
            bgColor: theme.colors.baseInverse,
            onPress: handleBackup,
          },
        ]}
      />
    </BaseScreen>
  );
}
