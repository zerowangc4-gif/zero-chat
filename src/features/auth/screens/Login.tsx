import React, { useState } from "react";
import { Pressable, View, KeyboardAvoidingView, Platform } from "react-native";
import { BaseScreen, Button, Typography, Input } from "@/components";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import IconFont from "@/iconfont";

// --- 深度视觉重构 ---

const StyledBaseScreen = styled(BaseScreen)`
  background-color: #ffffff;
`;

const LoginContainer = styled.View`
  flex: 1;
  padding: 0 32px; /* 增加边距，更有呼吸感 */
  padding-top: 80px;
`;

const BrandHeading = styled.View`
  margin-bottom: 60px;
`;

const FormSection = styled.View`
  margin-bottom: 24px;
`;

const AgreementSection = styled.View`
  margin-top: auto;
  padding-bottom: 40px; /* 底部留白 */
`;

const AgreementRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
`;

// --- Tooltip 气泡：更轻量，更圆润 ---
const Tooltip = styled.View`
  position: absolute;
  top: -42px;
  left: -4px;
  background-color: #1a1a1a; /* 纯黑偏深灰 */
  padding: 8px 14px;
  border-radius: 10px;
  z-index: 100;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
`;

const TooltipArrow = styled.View`
  position: absolute;
  bottom: -4px;
  left: 12px;
  width: 10px;
  height: 10px;
  background-color: #1a1a1a;
  transform: rotate(45deg);
`;

// --- 圆圈：12px 精致版 ---
const CheckCircle = styled.View<{ $checked: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border-width: 1.2px;
  /* 选中时边框深色，未选中时浅灰色 */
  border-color: ${props => (props.$checked ? "#1A1A1A" : "#DEDEDE")};
  background-color: ${props => (props.$checked ? "#F5F5F5" : "transparent")};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-top: 4px;
`;

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 1. 规范化的 Change 函数
  const handleEmailChange = (text: string) => {
    setEmail(text.trim());
  };

  const handleLogin = () => {
    if (!isAgreed) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
      return;
    }
    console.log("Logged in with:", email);
  };

  return (
    <StyledBaseScreen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <LoginContainer>
          <BrandHeading>
            <Typography type="heading" style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>
              {t("auth.welcome_title")}
            </Typography>
            <Typography type="subheading" color="#8E8E93">
              {t("auth.welcome_slogan")}
            </Typography>
          </BrandHeading>

          <FormSection>
            <Input
              placeholder="请输入邮箱"
              borderType="bottom"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              style={{ fontSize: 18, paddingVertical: 12 }}
            />
            <View style={{ marginTop: 12 }}>
              <Typography type="caption" color="#AEAEB2">
                未注册的邮箱通过验证将自动注册
              </Typography>
            </View>
          </FormSection>

          <AgreementSection>
            <AgreementRow>
              {showTooltip && (
                <Tooltip>
                  <Typography color="#FFFFFF" style={{ fontSize: 12, fontWeight: "500" }}>
                    请先阅读并勾选协议
                  </Typography>
                  <TooltipArrow />
                </Tooltip>
              )}

              <Pressable onPress={() => setIsAgreed(!isAgreed)} hitSlop={15}>
                <CheckCircle $checked={isAgreed}>
                  {/* ✨ 黑色对号：当选中时显示，size 只有 8px 保证精致 */}
                  {isAgreed && <IconFont name="close" size={8} color="#1A1A1A" />}
                </CheckCircle>
              </Pressable>

              <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, lineHeight: 20 }}>
                <Typography type="caption" color="#8E8E93">
                  已阅读并同意
                </Typography>
                <Pressable>
                  <Typography type="caption" color="#1A1A1A" style={{ fontWeight: "600" }}>
                    《用户服务协议》
                  </Typography>
                </Pressable>
                <Typography type="caption" color="#8E8E93">
                  与
                </Typography>
                <Pressable>
                  <Typography type="caption" color="#1A1A1A" style={{ fontWeight: "600" }}>
                    《隐私权政策》
                  </Typography>
                </Pressable>
              </View>
            </AgreementRow>

            <Button
              size="lg"
              title={t("auth.login")}
              block
              onPress={handleLogin}
              style={{ borderRadius: 12, height: 54 }}
            />
          </AgreementSection>
        </LoginContainer>
      </KeyboardAvoidingView>
    </StyledBaseScreen>
  );
}

export default Login;
