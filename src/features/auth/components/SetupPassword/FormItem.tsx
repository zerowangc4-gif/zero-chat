import styled from "styled-components/native";
import { Typography, Input } from "@/components";

const FormItemContainer = styled.View`
  gap: ${props => props.theme.spacing.step.sm}px;
`;
const FormField = styled.View`
  gap: ${props => props.theme.spacing.step.md}px;
`;
export interface InputItemProps {
  label: string;
  onChange: (text: string) => void;
  isEditable: boolean;
  value: string;
  placeholder: string;
  isShow: boolean;
  color: string;
  tagline: string;
}
export const FormItem = (props: InputItemProps) => {
  return (
    <FormItemContainer>
      <FormField>
        <Typography type="main" weight="bold">
          {props.label}
        </Typography>
        <Input
          size="lg"
          onChangeText={props.onChange}
          secureTextEntry
          editable={props.isEditable}
          value={props.value}
          placeholder={props.placeholder}
        />
      </FormField>
      {props.isShow && (
        <Typography type="caption" color={props.color}>
          {props.tagline}
        </Typography>
      )}
    </FormItemContainer>
  );
};
