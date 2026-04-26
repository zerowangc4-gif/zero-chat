import { ActionIcon, BaseInput } from "@/components";
import styled, { css, useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageListProps } from "./MessageList";
import { Icon } from "@/constants";
import { EmojiPanel } from "./EmojiPanel";

const Container = styled.View<{
  $bottom: number;
}>`
  ${({ theme, $bottom }) => {
    return css`
      flex-direction: row;
      min-height: ${theme.size.md}px;
      align-items: flex-end;
      padding-top: ${theme.spacing.step.xs}px;
      padding-right: ${theme.spacing.step.sm}px;
      padding-bottom: ${$bottom}px;
      padding-left: ${theme.spacing.step.sm}px;
      background-color: ${theme.colors.fillSecondary};
    `;
  }}
`;

const Left = styled.View`
  ${({ theme }) => {
    return css`
      padding-right: ${theme.spacing.step.sm}px;
      padding-bottom: ${theme.spacing.step.xs}px;
    `;
  }}
`;

const Center = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      min-height: ${theme.size.sm}px;
      border-radius: ${theme.radii.scale.lg}px;
      padding-left: ${theme.spacing.step.sm}px;
      padding-right: ${theme.spacing.step.sm}px;
      background-color: ${theme.colors.base};
      overflow: hidden;
    `;
  }}
`;

const Right = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      padding-left: ${theme.spacing.step.sm}px;
      padding-bottom: ${theme.spacing.step.xs}px;
      gap: ${theme.spacing.step.sm}px;
    `;
  }}
`;

export function MessageInput({
  msg,
  showEmoji,
  handleEmojiPanel,
  onSelectEmoji,
  closeInputPanel,
  setInputSelection,
  inputRef,
  onSend,
}: Omit<MessageListProps, "messages" | "handleGroupLink">) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const actions = [
    {
      name: showEmoji ? Icon.keyboard : Icon.meme,
      size: theme.typography.size.lg,
      color: theme.colors.baseInverse,
      onPress: handleEmojiPanel,
    },
    {
      name: msg.value.trim() ? Icon.send : Icon.chatAdd,
      size: theme.typography.size.lg,
      color: msg.value.trim() ? theme.palette.brand : theme.colors.baseInverse,
      onPress: msg.value.trim() ? onSend : null,
    },
  ];

  return (
    <>
      <Container $bottom={insets.bottom + theme.spacing.step.xs}>
        <Left>
          <ActionIcon name={Icon.voice} size={theme.typography.size.lg} color={theme.colors.baseInverse} />
        </Left>
        <Center>
          <BaseInput
            $size="md"
            ref={inputRef}
            value={msg.value}
            onChangeText={msg.onChange}
            onFocus={closeInputPanel}
            onSelectionChange={e => setInputSelection(e.nativeEvent.selection)}
            multiline={true}
            scrollEnabled={false}
            textAlignVertical="center"
          />
        </Center>
        <Right>
          {actions.map(item => {
            return (
              <ActionIcon key={item.name} name={item.name} size={item.size} color={item.color} onPress={item.onPress} />
            );
          })}
        </Right>
      </Container>
      {showEmoji && <EmojiPanel onSelectEmoji={onSelectEmoji} />}
    </>
  );
}
