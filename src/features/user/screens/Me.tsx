import { BaseScreen, Main } from "@/components";
import { UserInfo } from "../components";
import { useMe } from "../hooks";
export function Me() {
  const { handleCopyAdress } = useMe();
  return (
    <BaseScreen>
      <UserInfo handleCopyAdress={handleCopyAdress} />
      <Main />
    </BaseScreen>
  );
}
