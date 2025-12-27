import { BaseScreen, Button, Typography, Input } from "@/components";
import { useTranslation } from "react-i18next";
import IconFont from "@/iconfont";
import styled from "styled-components/native";

const BrandHeading = styled.View`
  gap: ${props => props.theme.spacing.layout.tight}px;
`;
const ContentContainer = styled.View`
  gap: 32px;
`;
function Login() {
  const { t } = useTranslation();
  return (
    <BaseScreen>
      <ContentContainer>
        <BrandHeading>
          <Typography type="heading">{t("auth.welcome_title")}</Typography>
          <Typography type="subheading">{t("auth.welcome_slogan")}</Typography>
        </BrandHeading>
        <Input label="登录" value="csd" leftIcon={<IconFont name="laba" size={20} color="#666" />} />
        <Button size="lg" title={t("auth.login")} block={true} />
      </ContentContainer>
    </BaseScreen>
  );
}
export default Login;
