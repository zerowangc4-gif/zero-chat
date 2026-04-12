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

let IconKongxinyuandian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 992c-64.78125 0-127.6875-12.65625-186.84375-37.6875C267.96875 930.125 216.6875 895.53125 172.625 851.375S93.875 756.03125 69.6875 698.84375C44.65625 639.6875 32 576.78125 32 512s12.65625-127.6875 37.6875-186.84375C93.875 267.96875 128.46875 216.6875 172.625 172.625S267.96875 93.875 325.15625 69.6875C384.3125 44.65625 447.21875 32 512 32s127.6875 12.65625 186.84375 37.6875C756.03125 93.875 807.3125 128.46875 851.375 172.625s78.75 95.34375 102.9375 152.53125c25.03125 59.15625 37.6875 122.0625 37.6875 186.84375s-12.65625 127.6875-37.6875 186.84375C930.125 756.03125 895.53125 807.3125 851.375 851.375s-95.34375 78.75-152.53125 102.9375c-59.15625 25.03125-122.0625 37.6875-186.84375 37.6875z m0-930.9375C263.375 61.0625 61.0625 263.375 61.0625 512s202.3125 450.9375 450.9375 450.9375 450.9375-202.3125 450.9375-450.9375S760.625 61.0625 512 61.0625z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconKongxinyuandian.defaultProps = {
  size: 20,
};

IconKongxinyuandian = React.memo ? React.memo(IconKongxinyuandian) : IconKongxinyuandian;

export default IconKongxinyuandian;
