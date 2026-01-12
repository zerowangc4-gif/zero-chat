import { useOnboarding } from "../hooks";
import { BaseScreen, Button, Typography, Main } from "@/components";
import styled from "styled-components/native";

const ContentContainer = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
  padding-right: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
`;
const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.layout.paddingTopHeader}px;
  margin-bottom: ${props => props.theme.spacing.layout.ActionToHeader}px;
`;
const ButtonAction = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;
export function OnboardingScreen() {
  const { handleCreateAccount, t } = useOnboarding();
  return (
    <BaseScreen>
      <ContentContainer>
        <WelcomeMessage>
          <Typography type="heading">{t("auth.welcome_title")}</Typography>
          <Typography type="heading">{t("auth.welcome_slogan")}</Typography>
        </WelcomeMessage>
        <ButtonAction>
          <Button title={t("auth.button_create_account")} block={true} type="primary" onPress={handleCreateAccount} />
          <Button title={t("auth.button_login_account")} block={true} type="secondary" />
        </ButtonAction>
      </ContentContainer>
    </BaseScreen>
  );
}
