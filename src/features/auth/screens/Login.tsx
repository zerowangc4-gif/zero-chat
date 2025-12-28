import { BaseScreen, Button, Typography, Input, AgreeButton } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { View, Pressable } from "react-native";

// 1. 增加沉浸式顶边距和左右大留白 (32px)
const ContentContainer = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 80px; /* 让内容从状态栏优雅地沉下来 */
`;

// 2. 标题区：拉开呼吸感
const BrandHeading = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
  margin-bottom: 54px;
`;

// 3. 协议组：处理对齐和换行
const ConsentGroup = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap; /* 适配窄屏幕自动换行 */
  margin-bottom: 32px;
  position: relative;
`;

// 4. 输入组：设置板块间距
const InputGroup = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
  margin-bottom: 36px;
`;

function Login() {
  const { t } = useTranslation();
  const [isAgreed, setIsAgreed] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmail = (text: string) => {
    setEmail(text.trim());
  };

  return (
    // 使用 extendToTop 让白色背景充满整个屏幕包括状态栏
    <BaseScreen>
      <ContentContainer>
        <BrandHeading>
          <Typography type="heading">{t("auth.welcome_title")}</Typography>
          <Typography type="subheading">{t("auth.welcome_slogan")}</Typography>
        </BrandHeading>

        <InputGroup>
          <Input placeholder="请输入邮箱" value={email} onChangeText={handleEmail} borderType="bottom" />
          <Typography type="caption" color="#AEAEB2">
            未注册的邮箱通过验证将自动注册
          </Typography>
        </InputGroup>

        <ConsentGroup>
          <AgreeButton checked={isAgreed} onPress={() => setIsAgreed(!isAgreed)} />
          <Typography type="caption" color="#8E8E93">
            已阅读并同意
          </Typography>
          <Pressable>
            <Typography type="caption" color="#1A1A1A">
              《用户服务协议》
            </Typography>
          </Pressable>
          <Typography type="caption" color="#8E8E93">
            与
          </Typography>
          <Pressable>
            <Typography type="caption" color="#1A1A1A">
              《隐私权政策》
            </Typography>
          </Pressable>
        </ConsentGroup>

        <Button size="lg" title={t("auth.login")} block={true} onPress={() => console.log("Login press")} />
      </ContentContainer>
    </BaseScreen>
  );
}

export default Login;
