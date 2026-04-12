import { FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "@/store";
import { MessageInput } from "./MessageInput";
import { MessageItem } from "./MessageItem";
import { Message, InputProps } from "../../store";

export interface MessageListProps {
  messages: Message[];
  msg: InputProps;
  onSend: () => void;
}

export function MessageList({ messages, msg, onSend }: MessageListProps) {
  const { user } = useAppSelector(state => state.chat);

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
      <MessageInput msg={msg} onSend={onSend} />
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 16,
  },
});
