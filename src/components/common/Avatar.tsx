import React, { useMemo } from "react";
import multiavatar from "@multiavatar/multiavatar";
import { SvgXml } from "react-native-svg";

interface Props {
  publicKey: string;
  size?: number;
}

export function Avatar({ publicKey, size = 50 }: Props) {
  const svgCode = useMemo(() => {
    return multiavatar(publicKey);
  }, [publicKey]);
  return <SvgXml xml={svgCode} width={size} height={size} />;
}
