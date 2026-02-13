import React from "react";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ChatItem } from "./ChatItem";
import { SearchEntry } from "./SearchEntry";

const Container = styled.View`
  flex: 1;
`;

const MOCK_DATA = [
  {
    username: "Zorro",
    publicKey: "key-v1-01",
    address: "0x71C...a4b",
    lastMsg: "你刚才发的那个代码运行了吗？",
    time: "18:20",
  },
  { username: "Alice", publicKey: "key-v1-02", address: "0x123...f12", lastMsg: "好的，等会见。", time: "17:45" },
  { username: "Bob", publicKey: "key-v1-03", address: "0x888...e31", lastMsg: "[图片]", time: "15:30" },
  {
    username: "匿名森林",
    publicKey: "key-v1-04",
    address: "0x999...abc",
    lastMsg: "那个匿名聊天的功能上线了吗？",
    time: "昨天",
  },
  { username: "大白鲨", publicKey: "key-v1-05", address: "0x552...eef", lastMsg: "晚上一起打游戏吗？", time: "14:10" },
  {
    username: "极客猫",
    publicKey: "key-v1-06",
    address: "0x221...bb2",
    lastMsg: "Rust 的性能确实比 JS 强不少。",
    time: "13:05",
  },
  {
    username: "隔壁老王",
    publicKey: "key-v1-07",
    address: "0xac1...d3d",
    lastMsg: "这周末有空聚聚吗？",
    time: "12:00",
  },
  {
    username: "CoffeeLover",
    publicKey: "key-v1-08",
    address: "0xde2...cc1",
    lastMsg: "那家新开的咖啡店不错。",
    time: "11:50",
  },
  {
    username: "加密矿工",
    publicKey: "key-v1-09",
    address: "0x771...aa4",
    lastMsg: "BTC 又涨了，你怎么看？",
    time: "10:30",
  },
  {
    username: "星际穿越",
    publicKey: "key-v1-10",
    address: "0x334...ff5",
    lastMsg: "黑洞的边缘其实很美。",
    time: "09:00",
  },
  {
    username: "旅行者1号",
    publicKey: "key-v1-11",
    address: "0x661...dd2",
    lastMsg: "我刚到西藏，信号不太好。",
    time: "08:15",
  },
  {
    username: "深夜食堂",
    publicKey: "key-v1-12",
    address: "0xfe3...b41",
    lastMsg: "今晚想吃拉面还是寿司？",
    time: "昨天",
  },
  {
    username: "代码搬运工",
    publicKey: "key-v1-13",
    address: "0x821...cc5",
    lastMsg: "这个 Bug 调了一整天。",
    time: "昨天",
  },
  { username: "影子", publicKey: "key-v1-14", address: "0x112...dd3", lastMsg: "嘘，保持安静。", time: "昨天" },
  {
    username: "像素达人",
    publicKey: "key-v1-15",
    address: "0x554...ee1",
    lastMsg: "新画的像素画发给你看看。",
    time: "星期三",
  },
  {
    username: "复古玩家",
    publicKey: "key-v1-16",
    address: "0x992...aa8",
    lastMsg: "还是 FC 游戏好玩啊。",
    time: "星期三",
  },
  { username: "流浪地球", publicKey: "key-v1-17", address: "0x331...ff9", lastMsg: "向木星前进！", time: "星期二" },
  {
    username: "孤独的鲸",
    publicKey: "key-v1-18",
    address: "0x228...bb4",
    lastMsg: "52赫兹的声呐有人听到吗？",
    time: "星期二",
  },
  { username: "赛博幽灵", publicKey: "key-v1-19", address: "0x447...dd6", lastMsg: "网络永不遗忘。", time: "星期一" },
  {
    username: "首席铲屎官",
    publicKey: "key-v1-20",
    address: "0x883...cc9",
    lastMsg: "我家猫把键盘踩坏了...",
    time: "星期一",
  },
];
export function ChatList() {
  return (
    <Container>
      <FlatList
        data={MOCK_DATA}
        ListHeaderComponent={SearchEntry}
        renderItem={({ item }) => (
          <ChatItem
            username={item.username}
            publicKey={item.publicKey}
            address={item.address}
            lastMsg={item.lastMsg}
            time={item.time}
          />
        )}
        keyExtractor={item => item.publicKey}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
});
