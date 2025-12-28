import { BaseScreen, Button, Typography, Input, AgreeButton } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

const ContentContainer = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 60px;
`;

const BrandHeading = styled.View`
  margin-bottom: 56px;
  gap: 10px;
`;

const InputGroup = styled.View`
  margin-bottom: 40px;
  gap: 10px;
`;

const ConsentGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const ActionSection = styled.View`
  gap: 24;
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
          <Typography type="subheading" color={theme.colors.textPrimary}>
            {t("auth.welcome_slogan")}
          </Typography>
        </BrandHeading>

        {/* 输入功能：简洁清爽 */}
        <InputGroup>
          <Input
            placeholder="请输入邮箱"
            value={email}
            onChangeText={handleEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            borderType="bottom"
          />
          <Typography type="caption" color={theme.colors.textTertiary}>
            未注册的邮箱通过验证将自动注册
          </Typography>
        </InputGroup>

        {/* 提交区域：利用视觉层级引导点击 */}
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
