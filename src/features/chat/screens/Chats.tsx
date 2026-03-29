import { BaseScreen, Header, Main } from "@/components";
import { AccountInfo, HeaderAction, ChatList } from "../components";
import { useChars } from "../hooks";

export function Chats() {
  const { handlePressItem, handleAddFriend, theme, t } = useChars();
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo type="normal" />} rightElement={<HeaderAction />} />
      <Main hasHeader={true}>
        <ChatList
          theme={theme}
          handlePressItem={handlePressItem}
          searchContactPlaceholder={t("chat.placeholder_search_address")}
          handleAddFriend={handleAddFriend}
        />
      </Main>
    </BaseScreen>
  );
}
