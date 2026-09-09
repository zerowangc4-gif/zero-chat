import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { UserInfo, ChatSession } from "../../store";
import { ChatItem } from "./ChatItem";
import { SearchEntry } from "./SearchEntry";

const Container = styled.View`
  flex: 1;
`;

export interface Props {
  chatSessions: ChatSession[];
  handlePressItem: (item: UserInfo) => () => void;
  handleAddFriend: () => void;
  keyword: string;
  setKeyword: (value: string) => void;
}

export function ChatList({ chatSessions, handlePressItem, keyword, setKeyword }: Props) {
  return (
    <Container>
      <FlatList
        data={chatSessions}
        ListHeaderComponent={<SearchEntry keyword={keyword} setKeyword={setKeyword} />}
        renderItem={({ item }) => <ChatItem {...item} handlePressItem={handlePressItem(item)} />}
        keyExtractor={item => item.address || item.publicKey}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        windowSize={5}
        initialNumToRender={10}
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
