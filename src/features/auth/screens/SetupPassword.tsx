import { BaseScreen, Header, Main, Typography, Input, Button } from "@/components";
import { useSetupPassword } from "../hooks";
import styled from "styled-components/native";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
  padding-right: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
`;
const IntroSection = styled.View`
  gap: ${props => props.theme.spacing.step.xs}px;
  margin-bottom: ${props => props.theme.spacing.step.md}px;
`;

const FormGroup = styled.View`
  gap: ${props => props.theme.spacing.step.lg}px;
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
`;

const FormItem = styled.View`
  gap: ${props => props.theme.spacing.step.xs}px;
`;

const FormField = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;
const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.step.xl}px;
  left: ${props => props.theme.spacing.step.md}px;
  right: ${props => props.theme.spacing.step.md}px;
`;
export function SetupPassword() {
  const { t, theme, password, confirmPassword, showPasswordMismatchError, isFormValid, isGenerating, handleContinue } =
    useSetupPassword();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSection>
          <Typography type="heading">{t("auth.encrypt_title")}</Typography>
          <Typography type="caption" color={theme.colors.textTertiary}>
            {t("auth.encrypt_desc")}
          </Typography>
        </IntroSection>
        <FormGroup>
          <FormItem>
            <FormField>
              <Typography type="label">{t("auth.label_password")}</Typography>
              <Input
                size="lg"
                onChangeText={password.onChange}
                secureTextEntry
                editable={!isGenerating}
                value={password.value}
              />
            </FormField>
            <Typography type="caption" color={theme.colors.textTertiary}>
              {t("auth.hint_password")}
            </Typography>
          </FormItem>
          <FormItem>
            <FormField>
              <Typography type="label">{t("auth.label_confirm_password")}</Typography>
              <Input
                size="lg"
                onChangeText={confirmPassword.onChange}
                secureTextEntry
                editable={!!password.value && !isGenerating}
                value={confirmPassword.value}
              />
            </FormField>
            {showPasswordMismatchError && (
              <Typography type="caption" color={theme.colors.textErrorTertiary}>
                {t("auth.error_password_mismatch")}
              </Typography>
            )}
          </FormItem>
        </FormGroup>
      </MainContent>
      <Footer>
        <Button
          type="primary"
          block={true}
          loading={isGenerating}
          title={isGenerating ? t("auth.loading") : t("auth.button_continue")}
          onPress={handleContinue}
          disabled={!isFormValid}
        />
      </Footer>
    </BaseScreen>
  );
}
