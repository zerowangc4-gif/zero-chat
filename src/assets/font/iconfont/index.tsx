/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconDuihao from './IconDuihao';
import IconDuihao1 from './IconDuihao1';
import IconCloseCircle from './IconCloseCircle';
import IconLaba from './IconLaba';
import IconSousuo from './IconSousuo';
export { default as IconDuihao } from './IconDuihao';
export { default as IconDuihao1 } from './IconDuihao1';
export { default as IconCloseCircle } from './IconCloseCircle';
export { default as IconLaba } from './IconLaba';
export { default as IconSousuo } from './IconSousuo';

export type IconNames = 'duihao' | 'duihao1' | 'close_circle' | 'laba' | 'sousuo';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'duihao':
      return <IconDuihao key="1" {...rest} />;
    case 'duihao1':
      return <IconDuihao1 key="2" {...rest} />;
    case 'close_circle':
      return <IconCloseCircle key="3" {...rest} />;
    case 'laba':
      return <IconLaba key="4" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="5" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
