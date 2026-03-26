import styled from "styled-components/native";
import { BaseScreen, Header, Main } from "@/components";
import { Footer, FormGroup, IntroSectionComponent } from "../components";
import { useSetupPassword } from "../hooks";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.xl}px;
  padding-right: ${props => props.theme.spacing.step.xl}px;
`;

export function SetupPassword() {
  const {
    t,
    theme,
    password,
    confirmPassword,
    showPasswordMismatchError,
    isFormValid,
    showPasswordTagline,
    buttonText,
    isGenerating,
    handleContinue,
  } = useSetupPassword();

  return (
    <BaseScreen>
      <Header />
      <MainContent hasHeader={true}>
        <IntroSectionComponent
          title={t("auth.setting_mnemonic")}
          color={theme.colors.secondaryWord}
          tagline={t("auth.setting_mnemonic_tagline")}
        />
        <FormGroup
          data={[
            {
              label: t("auth.setting_password"),
              onChange: password.onChange,
              isEditable: !isGenerating,
              value: password.value,
              placeholder: t("auth.password_placeholder"),
              isShow: showPasswordTagline,
              color: theme.colors.secondaryWord,
              tagline: t("auth.setting_password_tagline"),
            },
            {
              label: t("auth.verify_password"),
              onChange: confirmPassword.onChange,
              isEditable: !!password.value && !isGenerating,
              value: confirmPassword.value,
              placeholder: t("auth.verify_password_placeholder"),
              isShow: showPasswordMismatchError,
              color: theme.colors.secondaryWord,
              tagline: t("auth.verify_password_tagline"),
            },
          ]}
        />
      </MainContent>
      <Footer
        data={[
          {
            title: buttonText,
            loading: isGenerating,
            disabled: !isFormValid,
            bgColor: theme.colors.baseInverse,
            onPress: handleContinue,
          },
        ]}
      />
    </BaseScreen>
  );
}
