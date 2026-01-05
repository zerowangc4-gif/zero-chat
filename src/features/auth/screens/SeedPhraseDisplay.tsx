import ViewShot from "react-native-view-shot";
import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components/native";
import { useTranslation } from "react-i18next";
import { BaseScreen, Button, Header, Main, Typography } from "@/components";
import { useAppRoute } from "@/navigation";
import { useSeedPhraseBackup } from "../hooks/useSeedPhraseBackup";

const WORD_ITEM_HEIGHT = 42;

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
  padding-right: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
`;
const ShotWrapper = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.step.lg}px;
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

const SecurityWarning = styled.View`
  padding: ${props => props.theme.spacing.step.md}px;
  border-radius: ${props => props.theme.radii.scale.lg}px;
  background-color: ${props => props.theme.colors.secondaryBg};
  gap: ${props => props.theme.spacing.step.xxs}px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.step.xl}px;
  left: ${props => props.theme.spacing.step.md}px;
  right: ${props => props.theme.spacing.step.md}px;
`;

export function SeedPhraseDisplayScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const route = useAppRoute();

  const mnemonic = route.params?.mnemonic || "";
  const words = useMemo(() => mnemonic.split(" ").filter(Boolean), [mnemonic]);

  const { viewShotRef, handleBackup } = useSeedPhraseBackup();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection>
          <Typography type="heading">{t("auth.create_account.seed.intro_title")}</Typography>
          <Typography type="caption">{t("auth.create_account.seed.intro_desc")}</Typography>
        </IntroSection>

        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }}>
          <ShotWrapper>
            <SeedCard>
              {words.map((word: string, index: number) => (
                <WordItem key={`${word}-${index}`}>
                  <Typography type="body">{word}</Typography>
                </WordItem>
              ))}
            </SeedCard>
          </ShotWrapper>
        </ViewShot>

        <SecurityWarning>
          <Typography color={theme.colors.textSecondary}>{t("auth.create_account.seed.warning_title")}</Typography>
          <Typography type="caption">{t("auth.create_account.seed.warning_share")}</Typography>
          <Typography type="caption">{t("auth.create_account.seed.warning_offline")}</Typography>
          <Typography type="caption">{t("auth.create_account.seed.warning_loss")}</Typography>
        </SecurityWarning>
      </MainContent>

      <Footer>
        <Button type="primary" block={true} title={t("auth.create_account.seed.button_save")} onPress={handleBackup} />
      </Footer>
    </BaseScreen>
  );
}
