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

let IconLoading: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 99.36592555a412.68261888 412.68261888 0 1 0 412.63407445 412.63407445H997.45185223A485.45185223 485.45185223 0 1 1 512 26.54814777v72.81777778z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLoading.defaultProps = {
  size: 20,
};

IconLoading = React.memo ? React.memo(IconLoading) : IconLoading;

export default IconLoading;
