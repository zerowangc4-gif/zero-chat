import React, { useMemo } from "react";
import multiavatar from "@multiavatar/multiavatar";
import { SvgXml } from "react-native-svg";

interface Props {
  avatarSeed: string;
  size?: number;
}

export function Avatar({ avatarSeed, size }: Props) {
  const svgCode = useMemo(() => {
    return multiavatar(avatarSeed);
  }, [avatarSeed]);
  return <SvgXml xml={svgCode} width={size} height={size} />;
}
