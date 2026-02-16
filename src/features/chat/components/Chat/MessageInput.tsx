import { ActionIcon, BaseInput } from "@/components";
import { useApp } from "@/hooks";
import { useState } from "react";
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
  const { insets, theme } = useApp();
  const [text, setText] = useState("");
  const bottom = insets.bottom + theme.spacing.step.xs;
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
        <ActionIcon name="jiahao" size={theme.typography.size.lg} color={theme.colors.baseInverse} />
      </Right>
    </Container>
  );
}
