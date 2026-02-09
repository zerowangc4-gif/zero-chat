/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconJiahao1 from './IconJiahao1';
import IconWode from './IconWode';
import IconGlBubble from './IconGlBubble';
import IconIconEyeOpenCopy from './IconIconEyeOpenCopy';
import IconIconEyeCloseCopy from './IconIconEyeCloseCopy';
import IconDaobanCopy from './IconDaobanCopy';
export { default as IconJiahao1 } from './IconJiahao1';
export { default as IconWode } from './IconWode';
export { default as IconGlBubble } from './IconGlBubble';
export { default as IconIconEyeOpenCopy } from './IconIconEyeOpenCopy';
export { default as IconIconEyeCloseCopy } from './IconIconEyeCloseCopy';
export { default as IconDaobanCopy } from './IconDaobanCopy';

export type IconNames = 'jiahao1' | 'wode' | 'gl-bubble' | 'icon-eye-open-copy' | 'icon-eye-close-copy' | 'daoban-copy';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'jiahao1':
      return <IconJiahao1 key="1" {...rest} />;
    case 'wode':
      return <IconWode key="2" {...rest} />;
    case 'gl-bubble':
      return <IconGlBubble key="3" {...rest} />;
    case 'icon-eye-open-copy':
      return <IconIconEyeOpenCopy key="4" {...rest} />;
    case 'icon-eye-close-copy':
      return <IconIconEyeCloseCopy key="5" {...rest} />;
    case 'daoban-copy':
      return <IconDaobanCopy key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
