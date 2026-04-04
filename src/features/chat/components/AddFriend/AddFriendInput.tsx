import styled from "styled-components/native";
import { Input } from "@/components";
import { t } from "i18next";
import { InputProps } from "../../store";

const Container = styled.View`
  padding-top: ${props => props.theme.spacing.step.md}px;
`;
interface Props {
  friendAddress: InputProps;
}
export function AddFriendInput({ friendAddress }: Props) {
  return (
    <Container>
      <Input
        value={friendAddress.value}
        onChangeText={friendAddress.onChange}
        placeholder={t("chat.placeholder_search_address")}
      />
    </Container>
  );
}
