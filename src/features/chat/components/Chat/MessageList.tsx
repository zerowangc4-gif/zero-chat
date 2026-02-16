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
  const messages: Message[] = [
    { id: "20", text: "最后一条测试消息，看看底部对齐了吗？", senderId: "me", createdAt: Date.now() },
    { id: "19", text: "应该没问题了，现在列表已经很长了。", senderId: "other", createdAt: Date.now() - 1000 * 10 },
    { id: "18", text: "Android 的键盘适配真的挺麻烦的。", senderId: "me", createdAt: Date.now() - 1000 * 20 },
    { id: "17", text: "是的，尤其是开启了沉浸式状态栏之后。", senderId: "other", createdAt: Date.now() - 1000 * 30 },
    { id: "16", text: "不过手动监听键盘高度的方法通常最稳。", senderId: "me", createdAt: Date.now() - 1000 * 40 },
    { id: "15", text: "你现在能看到这条消息吗？", senderId: "other", createdAt: Date.now() - 1000 * 50 },
    { id: "14", text: "可以，滚动非常顺畅。", senderId: "me", createdAt: Date.now() - 1000 * 60 },
    {
      id: "13",
      text: "测试一下长文本：这是一段为了测试气泡自动换行而故意写得很长很长很长的文字内容。",
      senderId: "other",
      createdAt: Date.now() - 1000 * 70,
    },
    { id: "12", text: "气泡显示正常，没有溢出。", senderId: "me", createdAt: Date.now() - 1000 * 80 },
    { id: "11", text: "那就好，继续填充数据中...", senderId: "other", createdAt: Date.now() - 1000 * 90 },
    { id: "10", text: "这是第 10 条消息了。", senderId: "me", createdAt: Date.now() - 1000 * 100 },
    { id: "9", text: "过半了，加油！", senderId: "other", createdAt: Date.now() - 1000 * 110 },
    { id: "8", text: "你觉得这个颜色搭配怎么样？", senderId: "me", createdAt: Date.now() - 1000 * 120 },
    { id: "7", text: "挺清爽的，符合现代审美。", senderId: "other", createdAt: Date.now() - 1000 * 130 },
    { id: "6", text: "主要是为了让用户看着舒服。", senderId: "me", createdAt: Date.now() - 1000 * 140 },
    { id: "5", text: "明白，细节决定成败。", senderId: "other", createdAt: Date.now() - 1000 * 150 },
    { id: "4", text: "准备好测试键盘避让了吗？", senderId: "me", createdAt: Date.now() - 1000 * 160 },
    { id: "3", text: "随时待命。", senderId: "other", createdAt: Date.now() - 1000 * 170 },
    { id: "2", text: "嘿！有什么可以帮你的？", senderId: "me", createdAt: Date.now() - 1000 * 180 },
    { id: "1", text: "你好！Zorro", senderId: "other", createdAt: Date.now() - 1000 * 190 },
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
