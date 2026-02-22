import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ChatItem, ChatItemProps } from "./ChatItem";
import { SearchEntry } from "./SearchEntry";

import { useChars } from "@/features/chat";

const Container = styled.View`
  flex: 1;
`;

export function ChatList() {
  const { navigation, ROUTES, recentChats } = useChars();

  const handlePressItem = (item: ChatItemProps) => () => {
    navigation.navigate(ROUTES.Chat, {
      address: item.address,
      username: item.username,
      avatarSeed: item.avatarSeed,
      publicKey: item.publicKey,
    });
  };
  return (
    <Container>
      <FlatList
        data={recentChats}
        ListHeaderComponent={SearchEntry}
        renderItem={({ item }) => <ChatItem {...item} onPress={handlePressItem(item)} />}
        keyExtractor={item => item.publicKey}
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
