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
      padding-top: ${props => props.theme.spacing.step.xs};
      padding-right: ${props => props.theme.spacing.step.sm}px;
      padding-bottom: ${$bottom};
      padding-left: ${props => props.theme.spacing.step.sm}px;
      background-color: ${theme.colors.fillSecondary};
    `;
  }}
`;

const Left = styled.View`
  padding-right: ${props => props.theme.spacing.step.sm}px;
  padding-bottom: ${props => props.theme.spacing.step.xs}px;
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
  flex-direction: row;
  padding-left: ${props => props.theme.spacing.step.sm}px;
  padding-bottom: ${props => props.theme.spacing.step.xs}px;
  gap: ${props => props.theme.spacing.step.sm}px;
`;
export function MessageInput() {
  const { insets, theme } = useApp();
  const [text, setText] = useState("");

  return (
    <Container $bottom={insets.bottom}>
      <Left>
        <ActionIcon name="shengyin" size={24} color={theme.colors.baseInverse} />
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
