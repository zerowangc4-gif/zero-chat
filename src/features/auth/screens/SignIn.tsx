import { Text, Button } from "react-native";
import { ScreenContainer } from "@/components";
import { loginApp } from "../store";
import { useAppDispatch, useAppSelector } from "@/store";
function SignIn() {
  const dispath = useAppDispatch();
  const { email } = useAppSelector(state => state.auth);
  return (
    <ScreenContainer title="消息">
      <Text>邮箱是:{email}</Text>
      <Button
        title="点击"
        onPress={() => {
          dispath(loginApp({ email: "我在测试你是否还存在", password: "csdcsdc" }));
        }}
      />
    </ScreenContainer>
  );
}
export default SignIn;
