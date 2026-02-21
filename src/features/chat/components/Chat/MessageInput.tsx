import { ActionIcon, BaseInput } from "@/components";
import { useChat } from "@/features/chat";
import styled, { css } from "styled-components/native";

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

export function MessageInput() {
  const { text, setText, bottom, theme, onSend } = useChat();

  return (
    <Container $bottom={bottom}>
      <Left>
        <ActionIcon name="shengyin" size={theme.typography.size.lg} color={theme.colors.baseInverse} />
      </Left>
      <Center>
        <BaseInput
          $size="md"
          multiline={true}
          scrollEnabled={false}
          textAlignVertical="center"
          value={text}
          onChangeText={setText}
        />
      </Center>
      <Right>
        <ActionIcon name="xiaolian" size={theme.typography.size.lg} color={theme.colors.baseInverse} />
        {text.trim() ? (
          <ActionIcon
            name="fasongxiaoxi"
            size={theme.typography.size.lg}
            color={theme.palette.brand}
            onPress={onSend}
          />
        ) : (
          <ActionIcon name="jiahao" size={theme.typography.size.lg} color={theme.colors.baseInverse} />
        )}
      </Right>
    </Container>
  );
}
