import styled from "styled-components/native";

import { BaseScreen, Button, Header, Main, Typography } from "@/components";
import { useBackupSecretQR } from "../hooks";
const WORD_ITEM_HEIGHT = 42;

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
  padding-right: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
`;
const ShotWrapper = styled.View`
  align-self: center;
`;
const QrContanier = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.step.md}px;
  align-items: center;
  gap: ${props => props.theme.spacing.step.xs}px;
`;
const SeedCard = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.step.md}px;
  background-color: ${props => props.theme.colors.secondaryBg};
  gap: ${props => props.theme.spacing.step.xs}px;
  margin-bottom: ${props => props.theme.spacing.step.lg}px;
  border-radius: ${props => props.theme.radii.scale.lg}px;
`;

const WordItem = styled.View`
  width: 30%;
  height: ${WORD_ITEM_HEIGHT}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.scale.md}px;
  border-width: ${props => props.theme.radii.scale.xs}px;
  border-color: ${props => props.theme.colors.borderBase};
`;

const IntroSection = styled.View`
  gap: ${props => props.theme.spacing.step.xs}px;
  margin-bottom: ${props => props.theme.spacing.step.lg}px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.step.xl}px;
  left: ${props => props.theme.spacing.step.md}px;
  right: ${props => props.theme.spacing.step.md}px;
`;

export function BackupSecretQR() {
  const { t, theme, words, encryptedMnemonic, viewShotRef, handleBackup, ViewShot, QRCode } = useBackupSecretQR();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection>
          <Typography type="heading">{t("auth.intro_title")}</Typography>
          <Typography type="caption" color={theme.colors.textTertiary}>
            {t("auth.intro_desc")}
          </Typography>
        </IntroSection>
        <SeedCard>
          {words.map((word: string, index: number) => (
            <WordItem key={`${word}-${index}`}>
              <Typography type="body">{word}</Typography>
            </WordItem>
          ))}
        </SeedCard>
        <ShotWrapper>
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }}>
            <QrContanier>
              <Typography type="caption">{t("auth.qr_label")}</Typography>
              <QRCode value={encryptedMnemonic} />
            </QrContanier>
          </ViewShot>
        </ShotWrapper>
      </MainContent>

      <Footer>
        <Button type="primary" block={true} title={t("auth.button_save")} onPress={handleBackup} />
      </Footer>
    </BaseScreen>
  );
}
