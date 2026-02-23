import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { MessageInput } from "./MessageInput";
import { useChat, Message } from "@/features/chat";

const MessageItem = styled.View<{ isMe: boolean }>`
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

export function MessageList() {
  const { user, messages } = useChat();

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const isMe = item.fromId === user.address;
    return (
      <MessageItem isMe={isMe}>
        <MessageText isMe={isMe}>{item.status}</MessageText>
        <MessageText isMe={isMe}>{item.content}</MessageText>
      </MessageItem>
    );
  };

  return (
    <>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
      <MessageInput />
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 16,
  },
});
