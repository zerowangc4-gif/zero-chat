import { FlatList, StyleSheet } from "react-native";
import { MessageInput } from "./MessageInput";
import { MessageItem } from "./MessageItem";

export function MessageList({ theme, messages, user, text, setText, bottom, onSend }) {
  return (
    <>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} isMe={item.fromId === user.address} />}
        keyExtractor={item => item.id}
        inverted
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
      <MessageInput theme={theme} text={text} setText={setText} bottom={bottom} onSend={onSend} />
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 16,
  },
});
