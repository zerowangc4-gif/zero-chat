import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "@/components";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";

const Container = styled.View`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.spacing.step.xxxl};
      gap: ${theme.spacing.step.lg};
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

export const LoginIntroSection = () => {
  const theme = useTheme();
  return (
    <Container>
      <Typography type="heading" weight="bold">
        请输入您的助记词, 或者直接扫码登录
      </Typography>
      <IdentifyQrCode>
        <IconFont name={Icon.scan} size={theme.typography.size.md} />
        <Typography color={theme.colors.secondaryWord}>支持快速二维码识别</Typography>
      </IdentifyQrCode>
    </Container>
  );
};
