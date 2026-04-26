import React from "react";
import styled, { css } from "styled-components/native";
import { Typography } from "@/components";
import { MessageStatus } from "@/constants";
import IconFont from "@/assets/font/iconfont";
import { useMessageStatus } from "../../utils";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

const StatusLine = styled.View`
  ${({ theme }) => {
    return css`
      align-self: flex-end;
      height: ${theme.typography.size.md}px;
      justify-content: center;
    `;
  }}
`;

interface TextContentProps {
  text: string;
  isMe: boolean;
  status: MessageStatus;
}

export function TextContent({ text, isMe, status }: TextContentProps) {
  const iconConfig = useMessageStatus(status);

  return (
    <Container>
      <Typography>{text}</Typography>
      {isMe && (
        <StatusLine>
          <IconFont {...iconConfig} />
        </StatusLine>
      )}
    </Container>
  );
}
