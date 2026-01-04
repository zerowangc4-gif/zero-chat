import React, { useState, useMemo } from "react";
import styled, { useTheme } from "styled-components/native";
import { useTranslation } from "react-i18next";
import { BaseScreen, Header, Main, Typography, Input, Button, Toast } from "@/components";
import { useGenerateWallet } from "@/features/wallet";
import { useAppNavigation } from "@/navigation";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
  padding-right: ${props => props.theme.spacing.layout.headerPaddingLeft}px;
`;

const FormGroup = styled.View`
  gap: ${props => props.theme.spacing.step.lg}px;
  margin-bottom: ${props => props.theme.spacing.step.lg}px;
`;

const FormItem = styled.View`
  gap: ${props => props.theme.spacing.step.xs}px;
`;

const FormField = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;

const SecurityNotice = styled.View`
  padding: ${props => props.theme.spacing.step.md}px;
  border-radius: ${props => props.theme.radii.scale.sm}px;
  background-color: ${props => props.theme.colors.secondaryBg};
  margin-bottom: ${props => props.theme.spacing.step.xxl}px;
`;

export function CreateAccountScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useAppNavigation();

  const { generate, isGenerating, error } = useGenerateWallet();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordValid = password.length >= 8;
  const isPasswordMatch = password.length > 0 && password === confirmPassword;

  const isFormValid = useMemo(() => {
    return username.trim().length > 0 && isPasswordValid && isPasswordMatch;
  }, [username, isPasswordValid, isPasswordMatch]);

  const handleContinue = async () => {
    if (!isFormValid || isGenerating) return;

    try {
      const mnemonic = await generate();

      if (mnemonic) {
        navigation.replace("SeedPhraseDisplay", { mnemonic });
      } else {
        Toast.error(error || t("auth.create_account.errors_mnemonic_empty"));
      }
    } catch (e: unknown) {
      const message = error || (e instanceof Error ? e.message : t("common.error"));
      Toast.error(message);
    }
  };

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <FormGroup>
          <FormItem>
            <FormField>
              <Typography type="label">{t("auth.create_account.label_username")}</Typography>
              <Input onChangeText={setUsername} value={username} />
            </FormField>
            <Typography type="caption" color={theme.colors.textTertiary}>
              {t("auth.create_account.hint_username")}
            </Typography>
          </FormItem>
          <FormItem>
            <FormField>
              <Typography type="label">{t("auth.create_account.label_password")}</Typography>
              <Input onChangeText={setPassword} secureTextEntry value={password} />
            </FormField>
            <Typography type="caption" color={theme.colors.textTertiary}>
              {t("auth.create_account.hint_password")}
            </Typography>
          </FormItem>
          <FormItem>
            <FormField>
              <Typography type="label">{t("auth.create_account.label_confirm_password")}</Typography>
              <Input onChangeText={setConfirmPassword} secureTextEntry value={confirmPassword} />
            </FormField>
            {confirmPassword.length > 0 && !isPasswordMatch && (
              <Typography type="caption" color={theme.colors.textErrorTertiary}>
                {t("auth.create_account.error_password_mismatch")}
              </Typography>
            )}
          </FormItem>
        </FormGroup>

        <SecurityNotice>
          <Typography type="caption" color={theme.colors.textTertiary}>
            {t("auth.create_account.security_notice")}
          </Typography>
        </SecurityNotice>

        <Button
          type="primary"
          block={true}
          title={t("auth.create_account.button_continue")}
          onPress={handleContinue}
          disabled={!isFormValid || isGenerating}
        />
      </MainContent>
    </BaseScreen>
  );
}
