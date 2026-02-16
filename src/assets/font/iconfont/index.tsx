/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconJiahao from './IconJiahao';
import IconShengyin from './IconShengyin';
import IconXiaolian from './IconXiaolian';
import IconSangediandian from './IconSangediandian';
import IconFanhui1 from './IconFanhui1';
import IconJiahao1 from './IconJiahao1';
import IconWode from './IconWode';
import IconGlBubble from './IconGlBubble';
import IconIconEyeOpenCopy from './IconIconEyeOpenCopy';
import IconIconEyeCloseCopy from './IconIconEyeCloseCopy';
import IconDaobanCopy from './IconDaobanCopy';
import IconSousuo from './IconSousuo';
export { default as IconJiahao } from './IconJiahao';
export { default as IconShengyin } from './IconShengyin';
export { default as IconXiaolian } from './IconXiaolian';
export { default as IconSangediandian } from './IconSangediandian';
export { default as IconFanhui1 } from './IconFanhui1';
export { default as IconJiahao1 } from './IconJiahao1';
export { default as IconWode } from './IconWode';
export { default as IconGlBubble } from './IconGlBubble';
export { default as IconIconEyeOpenCopy } from './IconIconEyeOpenCopy';
export { default as IconIconEyeCloseCopy } from './IconIconEyeCloseCopy';
export { default as IconDaobanCopy } from './IconDaobanCopy';
export { default as IconSousuo } from './IconSousuo';

export type IconNames = 'jiahao' | 'shengyin' | 'xiaolian' | 'sangediandian' | 'fanhui1' | 'jiahao1' | 'wode' | 'gl-bubble' | 'icon-eye-open-copy' | 'icon-eye-close-copy' | 'daoban-copy' | 'sousuo';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'jiahao':
      return <IconJiahao key="1" {...rest} />;
    case 'shengyin':
      return <IconShengyin key="2" {...rest} />;
    case 'xiaolian':
      return <IconXiaolian key="3" {...rest} />;
    case 'sangediandian':
      return <IconSangediandian key="4" {...rest} />;
    case 'fanhui1':
      return <IconFanhui1 key="5" {...rest} />;
    case 'jiahao1':
      return <IconJiahao1 key="6" {...rest} />;
    case 'wode':
      return <IconWode key="7" {...rest} />;
    case 'gl-bubble':
      return <IconGlBubble key="8" {...rest} />;
    case 'icon-eye-open-copy':
      return <IconIconEyeOpenCopy key="9" {...rest} />;
    case 'icon-eye-close-copy':
      return <IconIconEyeCloseCopy key="10" {...rest} />;
    case 'daoban-copy':
      return <IconDaobanCopy key="11" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="12" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
