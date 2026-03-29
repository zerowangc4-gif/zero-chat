import { useApp, useInput } from "@/hooks";
import { isValidEthereumAddress } from "@/utils";

export function useAddFriend() {
  const { navigation, theme, t } = useApp();

  const friendAddress = useInput("");

  const handleSearchUser = async () => {
    const value = friendAddress.value;
    if (!value) return;

    if (!isValidEthereumAddress(value)) {
      return;
    }
  };

  return { navigation, theme, t, friendAddress, handleSearchUser };
}
