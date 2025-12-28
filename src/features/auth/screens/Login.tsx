import { BaseScreen, Button, Typography, Input, AgreeButton } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

// 1. 增加边距，去掉全局 gap。精致感来源于“留白”的精准控制。
const ContentContainer = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 60px; /* 已经空出状态栏，这里 60px 是黄金下沉距离 */
`;

// 2. 品牌区：主副标题需要极近，形成一个信息块
const BrandHeading = styled.View`
  margin-bottom: 56px; /* 与输入框拉开较大的呼吸感 */
`;

// 副标题：通过 textSecondary 产生色彩深度对比
const WelcomeSlogan = styled(Typography)`
  margin-top: 10px;
`;

// 3. 输入组：提示语应紧贴输入框，形成功能关联
const InputGroup = styled.View`
  margin-bottom: 40px;
`;

const InputHint = styled(Typography)`
  margin-top: 14px;
`;

// 4. 协议组：必须处理换行(wrap)和垂直居中(center)
const ConsentGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`;

// 5. 动作区：不需要额外样式，直接作为布局包裹
const ActionSection = styled.View``;

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
          <WelcomeSlogan type="subheading" color={theme.colors.textPrimary}>
            {t("auth.welcome_slogan")}
          </WelcomeSlogan>
        </BrandHeading>

        {/* 输入功能：简洁清爽 */}
        <InputGroup>
          <Input
            placeholder="请输入邮箱"
            value={email}
            onChangeText={handleEmail}
            borderType="bottom"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputHint type="caption" color={theme.colors.textTertiary}>
            未注册的邮箱通过验证将自动注册
          </InputHint>
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
              {t("consent_privacy_policy")}
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
