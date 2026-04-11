import { BaseScreen, Header, Main, Portal } from "@/components";
import { UserInfo, MeRightAction, MeMenu } from "../components";
import { useMe } from "../hooks";
export function Me() {
  const { handleShowMeMenu, isMenuVisible, menuItems } = useMe();
  return (
    <BaseScreen>
      <Header leftElement={<UserInfo />} rightElement={<MeRightAction handleShowMeMenu={handleShowMeMenu} />} />
      <Main hasHeader={true}>
        {isMenuVisible && (
          <Portal id="me-menu">
            <MeMenu menuItems={menuItems} />
          </Portal>
        )}
      </Main>
    </BaseScreen>
  );
}
