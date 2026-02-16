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

let IconFanhui1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M255.72 511.99L250.27900001 517.451 686.469 953.646 773.721 866.41199999 419.317 511.99 773.721 157.608 686.469 70.354 250.27900001 506.568Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFanhui1.defaultProps = {
  size: 20,
};

IconFanhui1 = React.memo ? React.memo(IconFanhui1) : IconFanhui1;

export default IconFanhui1;
