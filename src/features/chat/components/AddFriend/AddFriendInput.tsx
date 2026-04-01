import styled from "styled-components/native";
import { Input } from "@/components";

const Container = styled.View`
  padding-top: ${props => props.theme.spacing.step.md}px;
`;

export function AddFriendInput({ value, onChange, placeholder }) {
  return (
    <Container>
      <Input value={value} onChangeText={onChange} placeholder={placeholder} />
    </Container>
  );
}
