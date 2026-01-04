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

let IconXiangzuojiantou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M744.10666667 959.14666667l-443.73333334-453.97333334 443.73333334-443.73333333c10.24-10.24 10.24-27.30666667 0-37.54666667-10.24-10.24-27.30666667-10.24-37.54666667 0l-460.8 464.21333334c-10.24 10.24-10.24 27.30666667 0 37.54666666l460.8 471.04c10.24 10.24 27.30666667 10.24 37.54666667 0C754.34666667 986.45333333 754.34666667 969.38666667 744.10666667 959.14666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXiangzuojiantou.defaultProps = {
  size: 20,
};

IconXiangzuojiantou = React.memo ? React.memo(IconXiangzuojiantou) : IconXiangzuojiantou;

export default IconXiangzuojiantou;
