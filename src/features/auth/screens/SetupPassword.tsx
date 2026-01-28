import { BaseScreen, Header, Main, Typography, Input, Button } from "@/components";
import { useSetupPassword } from "../hooks";
import styled from "styled-components/native";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.xl}px;
  padding-right: ${props => props.theme.spacing.step.xl}px;
`;
const IntroSection = styled.View`
  align-items: center;
  gap: ${props => props.theme.spacing.step.xl}px;
  margin-bottom: ${props => props.theme.spacing.step.xxxl}px;
`;

const FormGroup = styled.View`
  gap: ${props => props.theme.spacing.step.xl}px;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
`;

const FormItem = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;

const FormField = styled.View`
  gap: ${props => props.theme.spacing.step.md}px;
`;
const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.layout.ActionButtonToBottom}px;
  left: ${props => props.theme.spacing.step.xl}px;
  right: ${props => props.theme.spacing.step.xl}px;
`;

export function SetupPassword() {
  const { t, theme, password, confirmPassword, showPasswordMismatchError, isFormValid, isGenerating, handleContinue } =
    useSetupPassword();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection>
          <Typography type="heading" weight="bold">
            {t("auth.setting_mnemonic")}
          </Typography>
          <Typography color={theme.colors.secondaryWord}>{t("auth.setting_mnemonic_tagline")}</Typography>
        </IntroSection>
        <FormGroup>
          <FormItem>
            <FormField>
              <Typography type="main" weight="bold">
                {t("auth.setting_password")}
              </Typography>
              <Input
                size="lg"
                onChangeText={password.onChange}
                secureTextEntry
                editable={!isGenerating}
                value={password.value}
                placeholder={t("auth.password_placeholder")}
              />
            </FormField>
            <Typography type="caption" color={theme.colors.secondaryWord}>
              {t("auth.setting_password_tagline")}
            </Typography>
          </FormItem>
          <FormItem>
            <FormField>
              <Typography type="main" weight="bold">
                {t("auth.verify_password")}
              </Typography>
              <Input
                placeholder={t("auth.verify_password_placeholder")}
                size="lg"
                onChangeText={confirmPassword.onChange}
                secureTextEntry
                editable={!!password.value && !isGenerating}
                value={confirmPassword.value}
              />
            </FormField>
            {showPasswordMismatchError && (
              <Typography type="caption" color={theme.palette.error}>
                {t("auth.verify_password_tagline")}
              </Typography>
            )}
          </FormItem>
        </FormGroup>
      </MainContent>

      <Footer>
        <Button
          size="lg"
          type="primary"
          block={true}
          loading={isGenerating}
          title={isGenerating ? t("common.loading") : t("auth.action_generate_and_backup")}
          onPress={handleContinue}
          disabled={!isFormValid}
        />
      </Footer>
    </BaseScreen>
  );
}
