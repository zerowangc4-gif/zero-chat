import styled from "styled-components/native";
import { useWelcome, ConcentricCircles } from "@/features/auth";
import { BaseScreen, Button, Typography, Main } from "@/components";

const ContentContainer = styled(Main)`
  padding-top: ${props => props.theme.spacing.layout.homeTop}px;
`;
const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.step.md}px;
  gap: ${props => props.theme.spacing.step.sm}px;
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
            size="lg"
            title={t("auth.button_create_account")}
            bgColor={theme.colors.baseInverse}
            onPress={handleSetupPassword}
          />
          <Button size="lg" title={t("auth.button_login_account")} textColor={theme.colors.baseInverse} />
        </ButtonAction>
      </Footer>
    </BaseScreen>
  );
}
