import styled from "styled-components/native";

import { BaseScreen, Main } from "@/components";
import { AddFriendHeader, AddFriendInput, SearchResultCard } from "../components";
import { useAddFriend } from "../hooks";

const MainContent = styled(Main)`
  padding-left: ${props => props.theme.spacing.step.md}px;
  padding-right: ${props => props.theme.spacing.step.md}px;
  gap: ${props => props.theme.spacing.step.lg}px;
`;

export function AddFriend() {
  const { theme, navigation, t, friendAddress } = useAddFriend();
  return (
    <BaseScreen>
      <AddFriendHeader theme={theme} navigation={navigation} title={t("chat.add_friend")} />
      <MainContent hasHeader={true}>
        <AddFriendInput
          value={friendAddress.value}
          onChange={friendAddress.onChange}
          placeholder={t("chat.placeholder_search_address")}
        />
        <SearchResultCard />
      </MainContent>
    </BaseScreen>
  );
}
