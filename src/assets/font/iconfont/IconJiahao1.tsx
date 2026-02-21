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

let IconJiahao1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M966.80788106 472.31061521l-410.81397009 0.12915867L555.99391097 59.96901746c0-22.86765869-18.55867931-41.42633799-41.426338-41.426338s-41.42411139 18.55867931-41.42411139 41.426338l0 412.18126399-417.31863784-0.22936628c-0.04231069 0-0.08239347 0-0.12470417 0-22.82534929 0-41.34171791 18.43397386-41.42633799 41.30163382-0.12470416 22.86765869 18.39389105 41.46642208 41.25932313 41.54881556l417.60813027 0.22936629 0 413.17444542c0 22.90774276 18.55867931 41.42633799 41.42411138 41.426338s41.42633799-18.51636862 41.426338-41.426338L555.99168436 555.29022326l410.48216699-0.12915867c0.08239347 0 0.12470416 0 0.16478824 0 22.82534929 0 41.34171791-18.43397386 41.426338-41.30163384S989.63323035 472.39300868 966.80788106 472.31061521z"
        fill={getIconColor(color, 0, '#575B66')}
      />
    </Svg>
  );
};

IconJiahao1.defaultProps = {
  size: 20,
};

IconJiahao1 = React.memo ? React.memo(IconJiahao1) : IconJiahao1;

export default IconJiahao1;
