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

let IconDuihao1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.6 883.2c-205.2 0-372.1-166.7-372.1-371.5 0-204.9 166.9-371.5 372.1-371.5 205.2 0 372.1 166.7 372.1 371.5 0 204.9-166.9 371.5-372.1 371.5m0-817.3C265.3 65.9 65 265.9 65 511.7s200.3 445.8 446.6 445.8c246.2 0 446.6-200 446.6-445.8-0.1-245.8-200.4-445.8-446.6-445.8"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M636.1 415.4L459.6 608l-72.2-80.8c-13.7-15.3-37.2-16.6-52.5-3-15.3 13.7-16.7 37.2-3 52.5l99.7 111.5c7 7.8 17 12.3 27.5 12.4h0.2c10.4 0 20.4-4.4 27.5-12.1L691 465.6c13.9-15.1 12.8-38.6-2.3-52.5-15.2-13.8-38.7-12.8-52.6 2.3"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDuihao1.defaultProps = {
  size: 18,
};

IconDuihao1 = React.memo ? React.memo(IconDuihao1) : IconDuihao1;

export default IconDuihao1;
