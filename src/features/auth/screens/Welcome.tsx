import { BaseScreen } from "@/components";
import { Footer, HeroSection } from "../components";
import { useWelcome } from "../hooks";
import { t } from "i18next";

export function Welcome() {
  const { handleSetupPassword, handleLogin, theme } = useWelcome();
  return (
    <BaseScreen>
      <HeroSection brand={t("auth.brand_name")} slogan={t("auth.brand_tagline")} />
      <Footer
        data={[
          {
            title: t("auth.button_create_account"),
            bgColor: theme.colors.baseInverse,
            onPress: handleSetupPassword,
          },
          {
            title: t("auth.button_login_account"),
            textColor: theme.colors.baseInverse,
            onPress: handleLogin,
          },
        ]}
      />
    </BaseScreen>
  );
}
