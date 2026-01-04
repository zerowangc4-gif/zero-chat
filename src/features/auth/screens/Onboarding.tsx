import { BaseScreen, Button, Typography, Main } from "@/components";
import { useTranslation } from "react-i18next";
import { ROUTES, useAppNavigation } from "@/navigation";
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
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  // 创建新账号
  const handleCreateAccount = () => {
    navigation.navigate(ROUTES.CreateAccount);
  };
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
