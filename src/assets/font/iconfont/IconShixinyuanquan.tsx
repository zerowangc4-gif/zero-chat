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

let IconShixinyuanquan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M986.85735063 510.26014057a472.55825067 472.55825067 0 1 1-945.11650133 0 472.55825067 472.55825067 0 0 1 945.11650133 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M343.97928865 325.08938619a46.60337778 46.60337778 0 0 1 65.9282451 0l261.7245696 261.7245696a46.60337778 46.60337778 0 0 1-65.86610726 65.86610726L343.91715082 391.07976912a46.60337778 46.60337778 0 0 1 0-65.86610725z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M343.97928865 652.68006305a46.60337778 46.60337778 0 0 1 0-65.86610726l261.7245696-261.7245696a46.60337778 46.60337778 0 1 1 65.86610726 65.86610726l-261.66243176 261.78670744a46.60337778 46.60337778 0 0 1-65.86610726 0z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconShixinyuanquan.defaultProps = {
  size: 20,
};

IconShixinyuanquan = React.memo ? React.memo(IconShixinyuanquan) : IconShixinyuanquan;

export default IconShixinyuanquan;
