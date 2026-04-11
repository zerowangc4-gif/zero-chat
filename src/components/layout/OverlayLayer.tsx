import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import styled, { css } from "styled-components/native";

const Container = styled.Pressable`
  ${() => {
    return css`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
    `;
  }}
`;

let toggleVisible: (v: boolean, callback?: () => void) => void;

export function OverlayLayer() {
  const [visible, setVisible] = useState(false);

  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    toggleVisible = (v: boolean, callback?: () => void) => {
      setVisible(v);
      if (callback) {
        setOnCloseCallback(() => callback);
      } else {
        setOnCloseCallback(null);
      }
    };

    return () => {
      toggleVisible = () => {};
    };
  }, []);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Container
        onPress={() => {
          setVisible(false);
          onCloseCallback?.();
        }}
      />
    </View>
  );
}

OverlayLayer.show = (onClose?: () => void) => {
  toggleVisible?.(true, onClose);
};

OverlayLayer.hide = () => {
  toggleVisible?.(false);
};
