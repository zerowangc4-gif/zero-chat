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

let IconYoujiantou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M327.35767243 47.16139114L770.54782119 476.24248838c20.38611088 19.74965741 20.38611088 51.75028483 0 71.49994223s-53.4560408 19.74965741-73.87533016 0L253.48234225 118.66133337c-20.38611088-19.74965741-20.38611088-51.75028483 0-71.49994223S306.93988985 27.41173374 327.35767243 47.16139114z"
        fill={getIconColor(color, 0, '#879196')}
      />
      <Path
        d="M253.48234225 905.37184658l443.18864054-429.13086645c20.41929083-19.74965741 53.490729-19.74965741 73.87533016 0 20.38611088 19.74965741 20.38611088 51.75028483 0 71.49994224L327.35767243 976.87178881c-20.41929083 19.74965741-53.490729 19.74965741-73.87533018 0S233.09623138 925.05514409 253.48234225 905.37184658z"
        fill={getIconColor(color, 1, '#879196')}
      />
    </Svg>
  );
};

IconYoujiantou.defaultProps = {
  size: 20,
};

IconYoujiantou = React.memo ? React.memo(IconYoujiantou) : IconYoujiantou;

export default IconYoujiantou;
