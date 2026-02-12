import { BaseScreen, Header, Main } from "@/components";
import { AccountInfo, HeaderAction, SearchEntry, ChatItem } from "../components";

export function Chats() {
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo type="normal" />} rightElement={<HeaderAction />} />
      <Main hasHeader={true}>
        <SearchEntry />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
        <ChatItem username={""} publicKey={""} address={""} />
      </Main>
    </BaseScreen>
  );
}
