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

let IconArrowLeftSLine: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M461.994667 512l211.2 211.2-60.330667 60.373333L341.333333 512l271.530667-271.530667 60.330667 60.330667-211.2 211.2z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconArrowLeftSLine.defaultProps = {
  size: 20,
};

IconArrowLeftSLine = React.memo ? React.memo(IconArrowLeftSLine) : IconArrowLeftSLine;

export default IconArrowLeftSLine;
