import { useAppSelector } from "@/store";
export function useChars() {
  const { publicKey, username } = useAppSelector(state => state.auth.user);
  return { publicKey, username };
}
