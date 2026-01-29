import styled from "styled-components/native";

import { BaseScreen, Button, Header, Main, Typography } from "@/components";
import { useBackupSecretQR } from "../hooks";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.xl}px;
  padding-right: ${props => props.theme.spacing.step.xl}px;
`;

const IntroSection = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
  gap: ${props => props.theme.spacing.step.xs}px;
`;

const SeedCard = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.step.sm}px;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
`;

const WordItem = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.size.sm}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.borderColor};
  background-color: ${props => props.theme.colors.mnemonic_tile};
  border-radius: ${props => props.theme.radii.scale.md}px;
`;

const QrContanier = styled.View`
  background-color: ${props => props.theme.colors.surface_bg};
  align-self: stretch;
  height: ${props => props.theme.size.xxl}px;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.step.xs}px;
  border-radius: ${props => props.theme.radii.scale.md}px;
`;

const TextContent = styled.View`
  align-items: center;
`;
const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.layout.ActionButtonToBottom}px;
  left: ${props => props.theme.spacing.step.xl}px;
  right: ${props => props.theme.spacing.step.xl}px;
`;
export function BackupSecretQR() {
  const { t, theme, words, encryptedMnemonic, viewShotRef, handleBackup, ViewShot, QRCode } = useBackupSecretQR();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection>
          <Typography type="heading" weight="bold">
            {t("auth.remember_mnemonic")}
          </Typography>
          <Typography color={theme.colors.secondaryWord}>{t("auth.remember_mnemonic_tagline")}</Typography>
        </IntroSection>
        <SeedCard>
          {words.map((word: string, index: number) => (
            <WordItem key={`${word}-${index}`}>
              <Typography type="main">{word}</Typography>
            </WordItem>
          ))}
        </SeedCard>
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }}>
          <QrContanier>
            <QRCode size={140} value={encryptedMnemonic} backgroundColor="transparent" />
            <TextContent>
              <Typography type="main" weight="bold">
                {t("auth.backup_qr_title")}
              </Typography>

              <Typography type="caption" color={theme.colors.secondaryWord}>
                {t("auth.backup_qr_helper")}
              </Typography>
            </TextContent>
          </QrContanier>
        </ViewShot>
      </MainContent>

      <Footer>
        <Button type="primary" size="lg" block={true} title={t("auth.action_claim_identity")} onPress={handleBackup} />
      </Footer>
    </BaseScreen>
  );
}
