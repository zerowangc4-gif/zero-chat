import { BaseScreen, Button, Typography } from "@/components";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

const ButtonAction = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;
const WelcomeMessage = styled.View`
  padding-top: ${props => props.theme.spacing.layout.paddingTopHeader}px;
  margin-bottom: ${props => props.theme.spacing.step.xxxl}px;
`;
const ContentContainer = styled.View`
  padding-left: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
  padding-right: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
`;
export function OnboardingScreen() {
  const { t } = useTranslation();
  return (
    <BaseScreen>
      <ContentContainer>
        <WelcomeMessage>
          <Typography type="heading">{t("auth.welcome_title")}</Typography>
          <Typography type="heading">{t("auth.welcome_slogan")}</Typography>
        </WelcomeMessage>
        <ButtonAction>
          <Button title={t("auth.button_create_account")} block={true} type="primary" />
          <Button title={t("auth.button_login_account")} block={true} type="secondary" />
        </ButtonAction>
      </ContentContainer>
    </BaseScreen>
  );
}
