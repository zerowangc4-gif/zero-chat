import { BaseScreen, Header, Main } from "@/components";
import { AccountInfo, HeaderAction, ChatList } from "../components";

export function Chats() {
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo type="normal" />} rightElement={<HeaderAction />} />
      <Main hasHeader={true}>
        <ChatList />
      </Main>
    </BaseScreen>
  );
}
