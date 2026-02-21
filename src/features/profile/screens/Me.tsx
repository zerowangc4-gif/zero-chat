import { BaseScreen } from "@/components";
import { useApp } from "@/hooks";
import { Button, View } from "react-native";
import { updateUserAvatar } from "@/features/auth";
import { useAppSelector } from "@/store";
export function Me() {
  const { dispatch } = useApp();
  const { avatarSeed } = useAppSelector(state => state.auth.user);

  const handleRandomAvatar = () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const newSeed = `${avatarSeed}_${randomSuffix}`;

    dispatch(updateUserAvatar(newSeed));

    console.log("🚀 基于原种子更新:", newSeed);
  };
  return (
    <BaseScreen>
      <View style={{ flex: 1, justifyContent: "center", marginTop: 100 }}>
        <Button title="测试触发" onPress={handleRandomAvatar} />
      </View>
    </BaseScreen>
  );
}
