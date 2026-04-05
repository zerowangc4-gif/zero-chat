import React from "react";
import ToastMessage, { ToastConfig, BaseToastProps } from "react-native-toast-message";
import styled, { css } from "styled-components/native";
import { Typography } from "./Typography";

const CompactToast = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: center;
    padding-top: ${theme.spacing.step.md}px;
    padding-bottom: ${theme.spacing.step.md}px;
    background-color: ${theme.colors.surfaceBg};
  `}
`;
const SucessMessage = styled(Typography)`
  ${({ theme }) => css`
    color: ${theme.palette.brand};
  `}
`;
const FailMessage = styled(Typography)`
  ${({ theme }) => css`
    color: ${theme.palette.error};
  `}
`;
const toastConfig: ToastConfig = {
  error: ({ text1 }: BaseToastProps) => (
    <CompactToast>
      <FailMessage color="">{text1}</FailMessage>
    </CompactToast>
  ),
  success: ({ text1 }: BaseToastProps) => (
    <CompactToast>
      <SucessMessage>{text1}</SucessMessage>
    </CompactToast>
  ),
};

export const Toast = {
  config: toastConfig,
  error: (msg: string) => {
    ToastMessage.show({
      type: "error",
      text1: msg,
      topOffset: 50,
      visibilityTime: 2000,
      autoHide: true,
    });
  },
  success: (msg: string) => {
    ToastMessage.show({
      type: "success",
      text1: msg,
      topOffset: 50,
      visibilityTime: 2000,
      autoHide: true,
    });
  },
};
