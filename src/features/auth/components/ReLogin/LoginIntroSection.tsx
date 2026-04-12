import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "@/components";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
import { t } from "i18next";

const Container = styled.View`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.spacing.step.xxxl}px;
      gap: ${theme.spacing.step.lg}px;
    `;
  }}
`;

const IdentifyQrCode = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      gap: ${theme.spacing.step.sm}px;
    `;
  }}
`;
interface Props {
  handleIdentifyQRCode: () => void;
}
export const LoginIntroSection = ({ handleIdentifyQRCode }: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <Typography type="heading" weight="bold">
        {t("auth.relogin_title")}
      </Typography>
      <IdentifyQrCode onPress={handleIdentifyQRCode}>
        <IconFont name={Icon.scan} size={theme.typography.size.md} />
        <Typography color={theme.colors.secondaryWord}>{t("auth.scan_credential")}</Typography>
      </IdentifyQrCode>
    </Container>
  );
};
