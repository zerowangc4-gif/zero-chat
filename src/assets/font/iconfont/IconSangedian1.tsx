/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconSangedian1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 511.998977m-95.831602 0a95.831602 95.831602 0 1 0 191.663204 0 95.831602 95.831602 0 1 0-191.663204 0Z"
        fill={getIconColor(color, 0, '#9A9A9A')}
      />
      <Path
        d="M512 158.221558m-95.831602 0a95.831602 95.831602 0 1 0 191.663204 0 95.831602 95.831602 0 1 0-191.663204 0Z"
        fill={getIconColor(color, 1, '#9A9A9A')}
      />
      <Path
        d="M512 865.778442m-95.831602 0a95.831602 95.831602 0 1 0 191.663204 0 95.831602 95.831602 0 1 0-191.663204 0Z"
        fill={getIconColor(color, 2, '#9A9A9A')}
      />
    </Svg>
  );
};

IconSangedian1.defaultProps = {
  size: 20,
};

IconSangedian1 = React.memo ? React.memo(IconSangedian1) : IconSangedian1;

export default IconSangedian1;
