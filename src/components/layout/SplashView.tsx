import React, { useEffect, useState, useRef } from "react";
import { Animated, StatusBar, Modal } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Typography } from "@/components";
import { t } from "i18next";

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.baseInverse};
  justify-content: center;
  align-items: center;
`;
const WelcomeMessage = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.step.md}px;
  gap: ${props => props.theme.spacing.step.sm}px;
`;
export const SplashView = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
      hardwareAccelerated={true}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />
      <Container style={{ opacity: fadeAnim }}>
        <WelcomeMessage>
          <Typography type="brand" weight="bold" color={theme.colors.base}>
            {t("auth.brand_name")}
          </Typography>
          <Typography color={theme.colors.base}>{t("auth.brand_tagline")}</Typography>
        </WelcomeMessage>
      </Container>
    </Modal>
  );
};
