import { useAppSelector } from "@/store";
export function useChars() {
  const { avatarSeed, username } = useAppSelector(state => state.auth.user);
  return { avatarSeed, username };
}
