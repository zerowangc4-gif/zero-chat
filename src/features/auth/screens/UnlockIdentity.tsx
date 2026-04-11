import { t } from "i18next";
import styled from "styled-components/native";
import { BaseScreen, Header, Main, ActionIcon, Input } from "@/components";
import { Icon } from "@/constants";
import { useUnlockIdentity } from "../hooks";

import { Footer } from "../components";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.md}px;
  padding-right: ${props => props.theme.spacing.step.md}px;
`;

const InputWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.step.xxl}px;
`;

export function UnlockIdentity() {
  const { theme, handleGoback, password, isUnlocking, handleUnlock } = useUnlockIdentity();

  return (
    <BaseScreen>
      <Header
        leftElement={
          <ActionIcon
            onPress={handleGoback}
            name={Icon.back}
            size={theme.typography.size.md}
            color={theme.colors.secondaryWord}
          />
        }
        title={t("auth.unlock_identity_title")}
      />
      <MainContent hasHeader={true}>
        <InputWrapper>
          <Input
            value={password.value}
            onChangeText={password.onChange}
            secureTextEntry
            placeholder={t("auth.unlock_identity__placeholder")}
          />
        </InputWrapper>
      </MainContent>
      <Footer
        data={[
          {
            title: t("auth.unlock_identity_title"),
            loading: isUnlocking,
            disabled: password.value.length < 8,
            bgColor: theme.colors.baseInverse,
            onPress: handleUnlock,
          },
        ]}
      />
    </BaseScreen>
  );
}
