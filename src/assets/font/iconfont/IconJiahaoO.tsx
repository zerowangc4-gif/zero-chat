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

let IconJiahaoO: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512V70.13093706h55.23363335v441.86906294h441.86906295v55.23363335h-441.86906295v441.86906295h-55.23363335v-441.86906295H70.13093706v-55.23363335h441.86906294z"
        fill={getIconColor(color, 0, '#444444')}
      />
    </Svg>
  );
};

IconJiahaoO.defaultProps = {
  size: 20,
};

IconJiahaoO = React.memo ? React.memo(IconJiahaoO) : IconJiahaoO;

export default IconJiahaoO;
