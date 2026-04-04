import { BaseScreen, Header, Main } from "@/components";
import { AccountInfo, HeaderAction, ChatList } from "../components";
import { useChars } from "../hooks";

export function Chats() {
  const { handlePressItem, handleAddFriend, chatSessions } = useChars();
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo />} rightElement={<HeaderAction />} />
      <Main hasHeader={true}>
        <ChatList chatSessions={chatSessions} handlePressItem={handlePressItem} handleAddFriend={handleAddFriend} />
      </Main>
    </BaseScreen>
  );
}
