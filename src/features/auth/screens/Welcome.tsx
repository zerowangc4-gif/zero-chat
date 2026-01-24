import { useWelcome } from "../hooks";
import { BaseScreen, Button, Typography, Main } from "@/components";
import { Text } from "react-native";

import styled from "styled-components/native";

const ContentContainer = styled(Main)`
  padding-left: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
  padding-right: ${props => props.theme.spacing.layout.screenHorizontalPadding}px;
`;
const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.layout.paddingTopHeader}px;
  margin-bottom: ${props => props.theme.spacing.layout.ActionToHeader}px;
`;
const ButtonAction = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;
export function Welcome() {
  const { handleSetupPassword, t, isConnected } = useWelcome();
  return (
    <BaseScreen>
      <ContentContainer>
        <WelcomeMessage>
          <Text>Socket 状态: {isConnected ? "🟢 已连接" : "🔴 未连接"}</Text>
          <Typography type="heading">{t("auth.welcome_title")}</Typography>
          <Typography type="heading">{t("auth.welcome_slogan")}</Typography>
        </WelcomeMessage>
        <ButtonAction>
          <Button title={t("auth.button_create_account")} block={true} type="primary" onPress={handleSetupPassword} />
          <Button title={t("auth.button_login_account")} block={true} type="secondary" />
        </ButtonAction>
      </ContentContainer>
    </BaseScreen>
  );
}
