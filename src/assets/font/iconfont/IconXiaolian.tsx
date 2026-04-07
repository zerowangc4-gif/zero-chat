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
        d="M512 983.27272719c260.29090875 0 471.27272719-210.98181844 471.27272719-471.27272719C983.27272719 251.70909125 772.29090875 40.72727281 512 40.72727281 251.70909125 40.72727281 40.72727281 251.70909125 40.72727281 512c0 260.29090875 210.98181844 471.27272719 471.27272719 471.27272719z m0-69.81818157a401.45454563 401.45454563 0 1 1 0-802.90909125 401.45454563 401.45454563 0 0 1 0 802.90909125z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M281.6 682.13818156a325.83272719 325.83272719 0 0 0 460.8 0 34.90909125 34.90909125 0 1 0-49.39636406-49.35272718 256.01454562 256.01454562 0 0 1-362.00727188 0 34.90909125 34.90909125 0 1 0-49.39636406 49.35272718z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M348.36363594 421.10545437m-54.54545438 0a54.54545437 54.54545437 0 1 0 109.09090969 0 54.54545437 54.54545437 0 1 0-109.09090969 0Z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M675.63636406 421.10545437m-54.54545531 0a54.54545437 54.54545437 0 1 0 109.09090969 0 54.54545437 54.54545437 0 1 0-109.09090969 0Z"
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
