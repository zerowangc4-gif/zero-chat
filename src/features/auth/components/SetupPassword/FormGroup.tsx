import styled from "styled-components/native";
import { FormItem, InputItemProps } from "./FormItem";

const FormGroupContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.step.xl}px;
  gap: ${props => props.theme.spacing.step.lg}px;
`;

export const FormGroup = ({ data }: { data: InputItemProps[] }) => {
  return (
    <FormGroupContainer>
      {data.map((item: InputItemProps) => (
        <FormItem
          key={item.label}
          label={item.label}
          onChange={item.onChange}
          isEditable={item.isEditable}
          value={item.value}
          placeholder={item.placeholder}
          isShow={item.isShow}
          color={item.color}
          tagline={item.tagline}
        />
      ))}
    </FormGroupContainer>
  );
};
