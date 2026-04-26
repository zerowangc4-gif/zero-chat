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

let IconError: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M550.83614815 45.96622222h-77.6722963v699.05066667h77.6722963V45.96622222zM558.60337778 884.82702222h-93.20675556V978.03377778h93.20675556v-93.20675556z"
        fill={getIconColor(color, 0, '#000000')}
        fillOpacity=".9"
      />
    </Svg>
  );
};

IconError.defaultProps = {
  size: 20,
};

IconError = React.memo ? React.memo(IconError) : IconError;

export default IconError;
