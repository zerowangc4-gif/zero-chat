import React from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { BaseScreen, Button, Typography, Input } from "@/components";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

// 1. 处理页面整体布局：上下撑开
const FormLayout = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 20px; /* 确保底部按钮不贴边 */
`;

// 2. 品牌与输入区域
const TopSection = styled.View`
  margin-top: 40px; /* 根据视觉需求调整顶部间距 */
`;

const BrandHeading = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
  margin-bottom: 48px; /* 标题与输入框的大间距 */
`;

// 3. 输入框与其下方提示文字的组合
const InputWrapper = styled.View`
  gap: 12px;
`;

const HintText = styled(Typography)`
  color: ${props => props.theme.colors.textSecondary};
  padding-left: 4px; /* 微调对齐感 */
`;

function Login() {
  const { t } = useTranslation();

  return (
    <BaseScreen>
      {/* 点击空白区域自动收起键盘，提升交互体验 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <FormLayout>
            <TopSection>
              {/* 标题区 */}
              <BrandHeading>
                <Typography type="heading">{t("auth.welcome_title")}</Typography>
                <Typography type="subheading">{t("auth.welcome_slogan")}</Typography>
              </BrandHeading>

              {/* 输入区 + 提示语 */}
              <InputWrapper>
                <Input
                  size="lg"
                  placeholder={t("auth.placeholder_account")}
                  // 建议在此处根据业务增加键盘类型，如 keyboardType="email-address"
                />
                <HintText type="caption">{t("auth.first_login_hint", "第一次登录将自动创建账号")}</HintText>
              </InputWrapper>
            </TopSection>

            {/* 按钮区：由于 justify-content: space-between，它会沉到底部 */}
            <View>
              <Button
                size="lg"
                title={t("auth.login")}
                block={true}
                onPress={() => {
                  console.log("Login Pressed");
                }}
              />
            </View>
          </FormLayout>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseScreen>
  );
}

export default Login;
