import { ActionIcon, BaseInput } from "@/components";
import styled, { css, useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Props } from "./MessageList";
import { Icon } from "@/constants";
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
      border-radius: 12px;
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

export function MessageInput({ msg, onSend }: Omit<Props, "messages">) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Container $bottom={insets.bottom + theme.spacing.step.xs}>
      <Left>
        <ActionIcon name={Icon.voice} size={theme.typography.size.lg} color={theme.colors.baseInverse} />
      </Left>
      <Center>
        <BaseInput
          $size="md"
          multiline={true}
          scrollEnabled={false}
          textAlignVertical="center"
          value={msg.value}
          onChangeText={msg.onChange}
        />
      </Center>
      <Right>
        <ActionIcon name={Icon.meme} size={theme.typography.size.lg} color={theme.colors.baseInverse} />
        {msg.value.trim() ? (
          <ActionIcon name={Icon.send} size={theme.typography.size.lg} color={theme.palette.brand} onPress={onSend} />
        ) : (
          <ActionIcon name={Icon.chatAdd} size={theme.typography.size.lg} color={theme.colors.baseInverse} />
        )}
      </Right>
    </Container>
  );
}
