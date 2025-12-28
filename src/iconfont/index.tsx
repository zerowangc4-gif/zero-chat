/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconCloseCircle from './IconCloseCircle';
import IconLaba from './IconLaba';
import IconSousuo from './IconSousuo';
export { default as IconCloseCircle } from './IconCloseCircle';
export { default as IconLaba } from './IconLaba';
export { default as IconSousuo } from './IconSousuo';

export type IconNames = 'close_circle' | 'laba' | 'sousuo';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'close_circle':
      return <IconCloseCircle key="1" {...rest} />;
    case 'laba':
      return <IconLaba key="2" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="3" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
