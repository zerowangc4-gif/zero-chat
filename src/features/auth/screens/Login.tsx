import { BaseScreen, Button, Typography, Input, AgreeButton } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

const ContentContainer = styled.View`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 120px;
`;

const BrandHeading = styled.View`
  gap: 4px;
  margin-bottom: 30px;
`;

const InputGroup = styled.View`
  margin-bottom: 50px;
  gap: 10px;
`;

const ConsentGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ActionSection = styled.View`
  gap: 12px;
`;

function Login() {
  const { t } = useTranslation();
  const [isAgreed, setIsAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const theme = useTheme();

  const handleEmail = (text: string) => {
    setEmail(text.trim());
  };

  return (
    <BaseScreen>
      <ContentContainer>
        {/* 品牌视觉：强弱对比是关键 */}
        <BrandHeading>
          <Typography type="heading" color={theme.colors.textPrimary}>
            {t("auth.welcome_title")}
          </Typography>
          <Typography type="heading" color={theme.colors.textPrimary}>
            {t("auth.welcome_slogan")}
          </Typography>
        </BrandHeading>

        <InputGroup>
          <Input
            placeholder={t("auth.placeholder")}
            value={email}
            onChangeText={handleEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            borderType="bottom"
          />
          <Typography type="caption" color={theme.colors.textTertiary}>
            {t("auth.hint")}
          </Typography>
        </InputGroup>
        <ActionSection>
          <ConsentGroup>
            <AgreeButton checked={isAgreed} onPress={() => setIsAgreed(!isAgreed)} />
            <Typography type="caption" color={theme.colors.textTertiary}>
              {t("auth.consent_prefix")}
            </Typography>
            <Typography type="caption" color={theme.colors.textPrimary}>
              {t("auth.consent_user_agreement")}
            </Typography>
            <Typography type="caption" color={theme.colors.textTertiary}>
              {t("auth.consent_connector")}
            </Typography>
            <Typography type="caption" color={theme.colors.textPrimary}>
              {t("auth.consent_privacy_policy")}
            </Typography>
          </ConsentGroup>

          <Button
            size="lg"
            title={t("auth.login")}
            block={true}
            disabled={!isAgreed}
            onPress={() => console.log("Login press")}
          />
        </ActionSection>
      </ContentContainer>
    </BaseScreen>
  );
}

export default Login;
