import { BaseScreen, Button, Typography, Input, AgreeButton } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

const ContentContainer = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 80px; /* 让内容从状态栏优雅地沉下来 */
  gap: 40px;
`;

const BrandHeading = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
`;

// 3. 协议组：处理对齐和换行
const ConsentGroup = styled.View`
  flex-direction: row;
`;

// 4. 输入组：设置板块间距
const InputGroup = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
`;
const ActionSection = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
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
        <BrandHeading>
          <Typography type="heading" color={theme.colors.textPrimary}>
            {t("auth.welcome_title")}
          </Typography>
          <Typography type="subheading" color={theme.colors.textPrimary}>
            {t("auth.welcome_slogan")}
          </Typography>
        </BrandHeading>

        <InputGroup>
          <Input placeholder="请输入邮箱" value={email} onChangeText={handleEmail} borderType="bottom" />
          <Typography type="caption" color={theme.colors.textTertiary}>
            未注册的邮箱通过验证将自动注册
          </Typography>
        </InputGroup>
        <ActionSection>
          <ConsentGroup>
            <AgreeButton checked={isAgreed} onPress={() => setIsAgreed(!isAgreed)} />
            <Typography type="caption" color={theme.colors.textTertiary}>
              已阅读并同意
            </Typography>
            <Typography type="caption" color="#1A1A1A">
              《用户服务协议》
            </Typography>
            <Typography type="caption" color="#1A1A1A">
              《隐私权政策》
            </Typography>
          </ConsentGroup>
          <Button size="lg" title={t("auth.login")} block={true} onPress={() => console.log("Login press")} />
        </ActionSection>
      </ContentContainer>
    </BaseScreen>
  );
}

export default Login;
