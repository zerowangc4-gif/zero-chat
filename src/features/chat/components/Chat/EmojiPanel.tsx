import React, { useMemo, useEffect, useRef } from "react";
import styled, { useTheme, css } from "styled-components/native";
import { FlatList, Dimensions, Platform, Animated } from "react-native";
import { Emojis } from "@/constants";

import { MessageListProps } from "./MessageList";
import { useAppSelector } from "@/store";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width / 8;

const Container = styled.View<{ $height: number }>`
  ${({ $height }) => css`
    height: ${$height}px;
    overflow: hidden;
  `}
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const EmojiWrapper = styled.Pressable`
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  justify-content: center;
  align-items: center;
`;

const EmojiText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.typography.size.md}px;
    include-font-padding: false;
    text-align-vertical: center;
  `}
`;

export function EmojiPanel({ onSelectEmoji }: Pick<MessageListProps, "onSelectEmoji">) {
  const theme = useTheme();
  const { keyboardHeight } = useAppSelector(state => state.user.inputConfig);

  const targetHeight = keyboardHeight || theme.size.xxxl;

  const emojiData = useMemo(() => Object.values(Emojis), []);

  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animValue]);

  const animatedStyle = {
    height: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, targetHeight],
    }),
    opacity: animValue,
  };

  return (
    <AnimatedContainer $height={targetHeight} style={animatedStyle}>
      <FlatList
        data={emojiData}
        numColumns={8}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={48}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === "android"}
        getItemLayout={(_, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * Math.floor(index / 8),
          index,
        })}
        renderItem={({ item }) => (
          <EmojiWrapper
            onPress={onSelectEmoji(item)}
            style={({ pressed }) => ({
              opacity: pressed ? theme.interactive.activeOpacity : 1,
            })}>
            <EmojiText>{item}</EmojiText>
          </EmojiWrapper>
        )}
      />
    </AnimatedContainer>
  );
}
