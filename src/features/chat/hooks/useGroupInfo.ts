import { useMemo, useEffect, useState } from "react";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { getGroupAllInfo } from "../services";
import { GroupAllInfo } from "../store";
export function useGroupInfo() {
  const { navigation, route } = useApp();
  const { haveJoinGroups } = useAppSelector(state => state.chat);
  const { address } = route.params;
  const [groupAllInfo, setGroupAllInfo] = useState<GroupAllInfo | null>(null);

  const groupBasicInfo = useMemo(() => {
    return haveJoinGroups?.[address];
  }, [address, haveJoinGroups]);

  //获取群成员信息
  useEffect(() => {
    try {
      const handleGetGroupAllInfo = async () => {
        const result: GroupAllInfo = await getGroupAllInfo(groupBasicInfo.address, groupBasicInfo.ownerId);
        setGroupAllInfo(result);
      };
      handleGetGroupAllInfo();
    } catch (err: unknown) {
      console.error(err);
    }
  }, [address, groupBasicInfo.address, groupBasicInfo.ownerId]);

  console.log(groupAllInfo);
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };
  return { handleGoBack };
}
