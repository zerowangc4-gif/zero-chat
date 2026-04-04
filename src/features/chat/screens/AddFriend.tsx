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
  const { friendAddress, userInfo, handleAddFriend, handleGoBack } = useAddFriend();
  return (
    <BaseScreen>
      <AddFriendHeader handleGoBack={handleGoBack} />
      <MainContent hasHeader={true}>
        <AddFriendInput friendAddress={friendAddress} />
        <SearchResultCard userInfo={userInfo} handleAddFriend={handleAddFriend} />
      </MainContent>
    </BaseScreen>
  );
}
