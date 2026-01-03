/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconOpenEyes from './IconOpenEyes';
import IconIconCloseEyes from './IconIconCloseEyes';
import IconArrowLeftSLine from './IconArrowLeftSLine';
import IconWeixuanzhongyuanquan from './IconWeixuanzhongyuanquan';
import IconDuihao from './IconDuihao';
import IconDuihao1 from './IconDuihao1';
import IconCloseCircle from './IconCloseCircle';
import IconLaba from './IconLaba';
import IconSousuo from './IconSousuo';
export { default as IconOpenEyes } from './IconOpenEyes';
export { default as IconIconCloseEyes } from './IconIconCloseEyes';
export { default as IconArrowLeftSLine } from './IconArrowLeftSLine';
export { default as IconWeixuanzhongyuanquan } from './IconWeixuanzhongyuanquan';
export { default as IconDuihao } from './IconDuihao';
export { default as IconDuihao1 } from './IconDuihao1';
export { default as IconCloseCircle } from './IconCloseCircle';
export { default as IconLaba } from './IconLaba';
export { default as IconSousuo } from './IconSousuo';

export type IconNames = 'open_eyes' | 'icon-close-eyes' | 'arrow-left-s-line' | 'weixuanzhongyuanquan' | 'duihao' | 'duihao1' | 'close_circle' | 'laba' | 'sousuo';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'open_eyes':
      return <IconOpenEyes key="1" {...rest} />;
    case 'icon-close-eyes':
      return <IconIconCloseEyes key="2" {...rest} />;
    case 'arrow-left-s-line':
      return <IconArrowLeftSLine key="3" {...rest} />;
    case 'weixuanzhongyuanquan':
      return <IconWeixuanzhongyuanquan key="4" {...rest} />;
    case 'duihao':
      return <IconDuihao key="5" {...rest} />;
    case 'duihao1':
      return <IconDuihao1 key="6" {...rest} />;
    case 'close_circle':
      return <IconCloseCircle key="7" {...rest} />;
    case 'laba':
      return <IconLaba key="8" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="9" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
