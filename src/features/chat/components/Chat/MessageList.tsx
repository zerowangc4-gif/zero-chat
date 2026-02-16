import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { MessageInput } from "./MessageInput";
// 1. 定义单条消息的数据结构 (先写个简单的)
interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: number;
}

const Container = styled.View`
  flex: 1;
`;

// 这是一个临时的消息气泡组件，稍后我们会详细美化它
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
  // 模拟数据：注意在 inverted 模式下，索引 0 是最底部（最新消息）
  const messages: Message[] = [
    { id: "1", text: "你好！Zorro", senderId: "other", createdAt: Date.now() },
    { id: "2", text: "嘿！有什么可以帮你的？", senderId: "me", createdAt: Date.now() },
  ];

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const isMe = item.senderId === "me";
    return (
      <MessageItem isMe={isMe}>
        <MessageText isMe={isMe}>{item.text}</MessageText>
      </MessageItem>
    );
  };

  return (
    <Container>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // 核心：反转列表，让消息从底部开始排列
        inverted
        // 隐藏滚动条让界面更清爽
        showsVerticalScrollIndicator={false}
        // 优化性能
        contentContainerStyle={styles.listContentContainer}
      />
      <MessageInput />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    justifyContent: "flex-end",
  },
});
