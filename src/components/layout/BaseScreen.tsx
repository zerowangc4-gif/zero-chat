import React, { useCallback, useEffect, useRef } from "react";
import { StatusBar, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { useKeyboardHandler } from "react-native-keyboard-controller";
import { scheduleOnRN } from "react-native-worklets";
import { useApp } from "@/hooks";
import { setInputConfig } from "@/features/user";
import { useAppSelector } from "@/store";

const RootContainer = styled.View<{ bgColor: string }>`
  flex: 1;
  position: relative;
  background-color: ${props => props.bgColor};
`;

interface BaseScreenProps extends ViewProps {
  children: React.ReactNode;
  bgColor?: string;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({ children, bgColor }) => {
  const theme = useTheme();
  const barStyle = theme.isDark ? "light-content" : "dark-content";
  const { dispatch } = useApp();

  const { keyboardHeight } = useAppSelector(state => state.user.inputConfig);

  const keyboardHeightRef = useRef(keyboardHeight);

  const maxKeyboardHeightRef = useRef(0);

  const keyboardTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    keyboardHeightRef.current = keyboardHeight;
  }, [keyboardHeight]);

  const updateKeyboardHeight = useCallback(
    (height: number) => {
      if (height > maxKeyboardHeightRef.current) {
        maxKeyboardHeightRef.current = height;
      }

      if (keyboardTimerRef.current) {
        clearTimeout(keyboardTimerRef.current);
      }

      keyboardTimerRef.current = setTimeout(() => {
        if (maxKeyboardHeightRef.current > keyboardHeightRef.current) {
          dispatch(
            setInputConfig({
              key: "keyboardHeight",
              value: maxKeyboardHeightRef.current,
            }),
          );

          maxKeyboardHeightRef.current = 0;
        }
      }, 300);
    },
    [dispatch],
  );

  useKeyboardHandler(
    {
      onEnd: e => {
        "worklet";
        if (e.height > 0) {
          scheduleOnRN(updateKeyboardHeight, e.height);
        }
      },
    },
    [],
  );

  return (
    <RootContainer bgColor={bgColor ?? theme.colors.bgPage}>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" animated />
      {children}
    </RootContainer>
  );
};
