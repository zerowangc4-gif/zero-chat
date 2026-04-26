import { FlatList, StyleSheet, TextInput } from "react-native";
import { MessageInput } from "./MessageInput";
import { MessageItem } from "./MessageItem";
import { Message, InputProps } from "../../store";
import { InputSelection } from "@/types";

export interface MessageListProps {
  messages: Message[];
  msg: InputProps;
  showEmoji: boolean;
  handleEmojiPanel: () => void;
  onSelectEmoji: (item: string) => () => void;
  closeInputPanel: () => void;
  setInputSelection: React.Dispatch<React.SetStateAction<InputSelection>>;
  inputRef: React.RefObject<TextInput | null>;
  handleGroupLink: (id: string) => () => void;
  onSend: () => void;
}

export function MessageList({
  messages,
  msg,
  showEmoji,
  handleEmojiPanel,
  onSelectEmoji,
  closeInputPanel,
  setInputSelection,
  inputRef,
  handleGroupLink,
  onSend,
}: MessageListProps) {
  return (
    <>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem handleGroupLink={handleGroupLink} message={item} />}
        keyExtractor={item => item.id}
        inverted
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
      <MessageInput
        msg={msg}
        showEmoji={showEmoji}
        handleEmojiPanel={handleEmojiPanel}
        onSelectEmoji={onSelectEmoji}
        closeInputPanel={closeInputPanel}
        setInputSelection={setInputSelection}
        inputRef={inputRef}
        onSend={onSend}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 16,
  },
});
