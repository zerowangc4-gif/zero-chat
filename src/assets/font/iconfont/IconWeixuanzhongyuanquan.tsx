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

let IconWeixuanzhongyuanquan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.44304 940.315042c-237.326197 0-430.396447-193.21249-430.396447-430.695253 0-237.502206 193.07025-430.717765 430.396447-430.717765 237.303684 0 430.40668 193.236026 430.40668 430.717765C940.84972 747.101529 747.791749 940.315042 510.44304 940.315042zM510.44304 124.414591c-212.213239 0-384.861368 172.782182-384.861368 385.182686 0 212.403574 172.647105 385.161197 384.861368 385.161197 212.224496 0 384.870578-172.782182 384.870578-385.161197C895.314641 297.196773 722.667535 124.414591 510.44304 124.414591z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWeixuanzhongyuanquan.defaultProps = {
  size: 18,
};

IconWeixuanzhongyuanquan = React.memo ? React.memo(IconWeixuanzhongyuanquan) : IconWeixuanzhongyuanquan;

export default IconWeixuanzhongyuanquan;
