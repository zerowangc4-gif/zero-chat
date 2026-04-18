import { useCallback } from "react";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { UserInfo, setGroupMembersDraft } from "../store";

export function useStartGroup() {
  const { navigation, ROUTES, dispatch } = useApp();

  const groupMembers = useAppSelector(state => state.chat.groupMembersDraft || {});

  const handleGoBack = () => {
    navigation.goBack();
  };

  // 选择/取消-好友
  const handleSelectGroupMember = useCallback(
    (userInfo: UserInfo) => () => {
      const { address } = userInfo;
      if (groupMembers[address]) {
        const { [address]: _, ...rest } = groupMembers;
        dispatch(setGroupMembersDraft(rest));
      } else {
        dispatch(setGroupMembersDraft({ ...groupMembers, [address]: userInfo }));
      }
    },
    [dispatch, groupMembers],
  );

  // 跳转到群规则设置页
  const handleGoGroupSettings = () => {
    navigation.navigate(ROUTES.GroupSettings);
  };

  return { handleGoBack, groupMembers, handleSelectGroupMember, handleGoGroupSettings };
}
