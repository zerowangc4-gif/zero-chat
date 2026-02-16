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

let IconXiaolian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 953.81818174c244.02272695 0 441.81818174-197.79545479 441.81818174-441.81818174C953.81818174 267.97727305 756.02272695 70.18181826 512 70.18181826 267.97727305 70.18181826 70.18181826 267.97727305 70.18181826 512c0 244.02272695 197.79545479 441.81818174 441.81818174 441.81818174z m0-65.45454522a376.36363653 376.36363653 0 1 1 0-752.72727305 376.36363653 376.36363653 0 0 1 0 752.72727305z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M296 671.50454521a305.46818174 305.46818174 0 0 0 432 0 32.72727305 32.72727305 0 1 0-46.30909131-46.26818173 240.01363652 240.01363652 0 0 1-339.38181738 0 32.72727305 32.72727305 0 1 0-46.30909131 46.26818173z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M358.59090869 426.78636347m-51.13636348 0a51.13636347 51.13636347 0 1 0 102.27272784 0 51.13636347 51.13636347 0 1 0-102.27272784 0Z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M665.40909131 426.78636347m-51.13636436 0a51.13636347 51.13636347 0 1 0 102.27272784 0 51.13636347 51.13636347 0 1 0-102.27272784 0Z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconXiaolian.defaultProps = {
  size: 20,
};

IconXiaolian = React.memo ? React.memo(IconXiaolian) : IconXiaolian;

export default IconXiaolian;
