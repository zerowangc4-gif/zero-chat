import { useCallback } from "react";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { UserInfo, setGroupMembersDraft, InviteGroupMembers } from "../store";
import { Toast } from "@/components";
import { t } from "i18next";

export function useStartGroup() {
  const { navigation, route, ROUTES, dispatch } = useApp();
  const mode = route.params?.mode === "invite" ? "invite" : "create";
  const groupId = route.params?.groupId;

  const groupMembers = useAppSelector(state => state.chat.groupMembersDraft || {});

  const handleGoBack = () => {
    navigation.goBack();
  };

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

  const handleGoGroupSettings = () => {
    if (mode === "invite") {
      if (!groupId) {
        return;
      }
      dispatch(
        InviteGroupMembers({
          groupId,
          memberIds: Object.keys(groupMembers),
        }),
      );
      Toast.success(t("chat.invite_sent"));
      navigation.goBack();
      return;
    }
    navigation.navigate(ROUTES.GroupSettings);
  };

  return { handleGoBack, groupMembers, handleSelectGroupMember, handleGoGroupSettings, mode };
}
