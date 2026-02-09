import { BaseScreen, Header, Main } from "@/components";
import { AccountInfo, HeaderAction } from "../components";

export function Chats() {
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo type="normal" />} rightElement={<HeaderAction />} />
      <Main hasHeader={true} />
    </BaseScreen>
  );
}
