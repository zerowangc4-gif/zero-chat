import { FlatList, StyleSheet } from "react-native";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/features/chat";
import { MessageItem } from "./MessageItem";

export function MessageList() {
  const { messages, user } = useChat();

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
      <MessageInput />
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 16,
  },
});
