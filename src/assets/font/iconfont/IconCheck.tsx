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

let IconCheck: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1012.30904459 156.9921086l-537.38676652 698.98007395c-4.87492871 6.34447339-12.23677939 10.32919751-20.22035916 10.95092799-0.73477164 0.05652058-1.45541313 0.08478086-2.19018615 0.08478086-7.22054785 0-14.20088047-2.76952481-19.47145599-7.79988651l-289.99470467-276.00577773-44.736307 58.20241583c-9.52377515 12.3639507-27.25721375 14.69543828-39.63529458 5.17166452-12.37808083-9.509645-14.69543828-27.25721375-5.17166451-39.62116446l63.8827683-83.09988168c4.88905886-6.34447339 12.23677939-10.32919751 20.22035916-10.950928s15.86824854 2.19018615 21.66164215 7.71510566l289.99470466 276.00577772 518.22617506-674.08260944c9.52377515-12.37808083 27.25721375-14.69543828 39.63529459-5.18579467C1019.50133076 126.88058916 1021.8186882 144.61402639 1012.30904459 156.9921086z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCheck.defaultProps = {
  size: 20,
};

IconCheck = React.memo ? React.memo(IconCheck) : IconCheck;

export default IconCheck;
