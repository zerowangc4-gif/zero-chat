import styled from "styled-components/native";
import { Message } from "@/features/chat";

const Container = styled.View<{ isMe: boolean }>`
  padding: 12px;
  margin: 8px 16px;
  border-radius: 12px;
  max-width: 80%;
  align-self: ${props => (props.isMe ? "flex-end" : "flex-start")};
  background-color: ${props => (props.isMe ? props.theme.colors.baseInverse : props.theme.colors.base)};
`;

const MessageText = styled.Text<{ isMe: boolean }>`
  color: ${props => (props.isMe ? "#fff" : props.theme.colors.activeColor)};
`;

const TimeText = styled.Text`
  font-size: 10px;
  color: #999;
  margin-top: 4px;
  align-self: flex-end;
`;
export interface Props {
  item: Message;
  isMe: boolean;
}
export function MessageItem({ item, isMe }: Props) {
  return (
    <Container isMe={isMe}>
      <MessageText isMe={isMe}>{item.content}</MessageText>
      <TimeText>
        {item.status === "read" ? "✓✓ " : "✓ "}
        {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </TimeText>
    </Container>
  );
}
