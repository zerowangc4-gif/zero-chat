import React from "react";
import ToastMessage, { ToastConfig, BaseToastProps } from "react-native-toast-message";
import styled, { css } from "styled-components/native";
import { Typography } from "./Typography";

const ErrorToastContainer = styled.View`
  ${({ theme }) => css`
    width: 90%;
    padding: ${theme.spacing.layout.headerPaddingLeft}px;
    border-radius: ${theme.radii.scale.lg}px;
    background-color: ${theme.colors.textPrimary};
    align-self: center;
    ${theme.shadows.mid}
  `}
`;
const Text = styled(Typography)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;
const toastConfig: ToastConfig = {
  error: ({ text1 }: BaseToastProps) => (
    <ErrorToastContainer>
      <Text type="caption">{text1}</Text>
    </ErrorToastContainer>
  ),
};

export const Toast = {
  config: toastConfig,
  error: (msg: string) => {
    ToastMessage.show({
      type: "error",
      text1: msg,
      topOffset: 80,
    });
  },
};
