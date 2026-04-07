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

let IconSangedian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M199.111111 540.444444m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z"
        fill={getIconColor(color, 0, '#999999')}
      />
      <Path
        d="M506.311111 540.444444m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z"
        fill={getIconColor(color, 1, '#999999')}
      />
      <Path
        d="M813.511111 540.444444m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z"
        fill={getIconColor(color, 2, '#999999')}
      />
    </Svg>
  );
};

IconSangedian.defaultProps = {
  size: 20,
};

IconSangedian = React.memo ? React.memo(IconSangedian) : IconSangedian;

export default IconSangedian;
