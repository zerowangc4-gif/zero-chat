import { useWelcome } from "../hooks";
import { BaseScreen, Button, Typography, Main, ConcentricCircles } from "@/components";
import styled from "styled-components/native";

const ContentContainer = styled(Main)`
  padding-top: ${props => props.theme.spacing.layout.homeTop}px;
`;
const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.step.md}px;
  gap: ${props => props.theme.spacing.step.xs}px;
`;
const ButtonAction = styled.View`
  gap: ${props => props.theme.spacing.step.md}px;
`;
const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.layout.ActionButtonToBottom}px;
  left: ${props => props.theme.spacing.step.xl}px;
  right: ${props => props.theme.spacing.step.xl}px;
`;
export function Welcome() {
  const { handleSetupPassword, t, theme } = useWelcome();
  return (
    <BaseScreen>
      <ContentContainer>
        <ConcentricCircles />
        <WelcomeMessage>
          <Typography type="brand" weight="bold">
            {t("auth.brand_name")}
          </Typography>
          <Typography color={theme.colors.secondaryWord}>{t("auth.brand_tagline")}</Typography>
        </WelcomeMessage>
      </ContentContainer>
      <Footer>
        <ButtonAction>
          <Button
            title={t("auth.button_create_account")}
            block={true}
            size="lg"
            type="primary"
            onPress={handleSetupPassword}
          />
          <Button title={t("auth.button_login_account")} block={true} size="lg" type="secondary" />
        </ButtonAction>
      </Footer>
    </BaseScreen>
  );
}
