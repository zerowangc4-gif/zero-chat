import React, { useMemo, useEffect } from "react";
import styled, { useTheme, css } from "styled-components/native";
import { FlatList, Dimensions, Platform, LayoutAnimation, UIManager } from "react-native";
import { Emojis } from "@/constants";

import { MessageListProps } from "./MessageList";
import { useAppSelector } from "@/store";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

const ITEM_SIZE = width / 8;

const Container = styled.View<{ $height: number }>`
  ${({ $height }) => css`
    height: ${$height}px;
    overflow: hidden;
  `}
`;

const EmojiWrapper = styled.Pressable`
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  justify-content: center;
  align-items: center;
`;

const EmojiText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.typography.size.md}px;
    /* 修正 Android Emoji 渲染偏置 */
    include-font-padding: false;
    text-align-vertical: center;
  `}
`;

export function EmojiPanel({ onSelectEmoji }: Pick<MessageListProps, "onSelectEmoji">) {
  const theme = useTheme();
  const { keyboardHeight } = useAppSelector(state => state.user.inputConfig);

  const emojiPanelHeight = keyboardHeight || theme.size.xxxl;

  const emojiData = useMemo(() => Object.values(Emojis), []);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  }, []);

  return (
    <Container $height={emojiPanelHeight}>
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
    </Container>
  );
}
