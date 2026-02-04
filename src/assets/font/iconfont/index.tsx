/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconIconEyeOpenCopy from './IconIconEyeOpenCopy';
import IconIconEyeCloseCopy from './IconIconEyeCloseCopy';
import IconIconEyeOpenCopyCopy from './IconIconEyeOpenCopyCopy';
import IconIconEyeCloseCopyCopy from './IconIconEyeCloseCopyCopy';
import IconIconEyeOpenCopyCopy1 from './IconIconEyeOpenCopyCopy1';
import IconDaobanCopy from './IconDaobanCopy';
export { default as IconIconEyeOpenCopy } from './IconIconEyeOpenCopy';
export { default as IconIconEyeCloseCopy } from './IconIconEyeCloseCopy';
export { default as IconIconEyeOpenCopyCopy } from './IconIconEyeOpenCopyCopy';
export { default as IconIconEyeCloseCopyCopy } from './IconIconEyeCloseCopyCopy';
export { default as IconIconEyeOpenCopyCopy1 } from './IconIconEyeOpenCopyCopy1';
export { default as IconDaobanCopy } from './IconDaobanCopy';

export type IconNames = 'icon-eye-open-copy' | 'icon-eye-close-copy' | 'icon-eye-open-copy-copy' | 'icon-eye-close-copy-copy' | 'icon-eye-open-copy-copy1' | 'daoban-copy';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-eye-open-copy':
      return <IconIconEyeOpenCopy key="1" {...rest} />;
    case 'icon-eye-close-copy':
      return <IconIconEyeCloseCopy key="2" {...rest} />;
    case 'icon-eye-open-copy-copy':
      return <IconIconEyeOpenCopyCopy key="3" {...rest} />;
    case 'icon-eye-close-copy-copy':
      return <IconIconEyeCloseCopyCopy key="4" {...rest} />;
    case 'icon-eye-open-copy-copy1':
      return <IconIconEyeOpenCopyCopy1 key="5" {...rest} />;
    case 'daoban-copy':
      return <IconDaobanCopy key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
