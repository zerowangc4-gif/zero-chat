import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions, StatusBar, Modal } from "react-native";
import styled from "styled-components/native";

// 获取屏幕物理全尺寸，解决 Dimensions.get('window') 不含虚拟按键的问题
const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

const FullContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  background-color: #000000; /* 确保是纯黑，不带引号 */
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.Text`
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 4px;
`;

export const SplashView = () => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 强制等待 2500ms，确保底部的 RootNavigator 已经完成了 Insets 的“乱跳”过程
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // 平滑淡出，消除切换时的生硬感
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }, 2500);

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
      <FullContainer style={{ opacity: fadeAnim }}>
        <LogoText>ZERO TRACE</LogoText>
      </FullContainer>
    </Modal>
  );
};
