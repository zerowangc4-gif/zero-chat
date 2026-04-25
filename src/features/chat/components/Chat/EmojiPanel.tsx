import React, { useMemo } from "react";
import styled, { useTheme, css } from "styled-components/native";
import { FlatList, Dimensions, Platform } from "react-native";
import { Emojis } from "@/constants";

import { MessageListProps } from "./MessageList";
import { useAppSelector } from "@/store";

const { width } = Dimensions.get("window");

const ITEM_SIZE = width / 8;

const Container = styled.View<{ $height: number }>`
  ${({ $height }) => {
    return css`
      height: ${$height}px;
    `;
  }}
`;

const EmojiWrapper = styled.Pressable`
  ${() => {
    return css`
      width: ${ITEM_SIZE}px;
      height: ${ITEM_SIZE}px;
      justify-content: center;
      align-items: center;
    `;
  }}
`;

const EmojiText = styled.Text`
  ${({ theme }) => {
    return css`
      font-size: ${theme.typography.size.md}px;
    `;
  }}
`;

export function EmojiPanel({ onSelectEmoji }: Pick<MessageListProps, "onSelectEmoji">) {
  const theme = useTheme();
  const { keyboardHeight } = useAppSelector(state => state.user.inputConfig);
  const emojiPanelHeight = keyboardHeight || theme.size.xxxl;
  const emojiData = useMemo(() => Object.values(Emojis), []);

  return (
    <Container $height={emojiPanelHeight}>
      <FlatList
        data={emojiData}
        numColumns={8}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={40}
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
