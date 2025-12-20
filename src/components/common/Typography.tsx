import styled from "styled-components/native";

export const Heading = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text.main};
  margin-bottom: 8px;
`;

export const SubHeading = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.main};
`;

export const BodyText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.text.main};
`;

export const HintText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text.sub};
`;
