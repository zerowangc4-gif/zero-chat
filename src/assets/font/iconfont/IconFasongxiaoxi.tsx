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

let IconFasongxiaoxi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M56.61582222 399.33724445L912.98702222 42.48462222c9.29564445-3.86844445 19.97937778-2.17315555 27.61386667 4.39182223a26.63196445 26.63196445 0 0 1 8.47644444 26.63537777L735.75537778 926.8224a26.63424 26.63424 0 0 1-17.57866667 18.8416c-8.704 2.84444445-18.26133333 1.00124445-25.2928-4.85831111L507.66506667 786.47751111c-10.59271111-8.81777778-26.15751111-8.0896-35.88551112 1.66115556l-95.00444444 94.93617778a26.63196445 26.63196445 0 0 1-28.95644444 5.72302222 26.61603555 26.61603555 0 0 1-16.45226667-24.49635556V663.64302222c0-7.0656 2.79893333-13.83537778 7.79377778-18.8416l386.34382222-386.34382222-456.11235555 342.14115555c-9.87591111 7.39555555-23.552 7.04284445-33.01831112-0.8647111L49.82328889 444.33635555a26.62968889 26.62968889 0 0 1-9.26151111-24.40533333 26.64903111 26.64903111 0 0 1 16.05404444-20.59377777z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFasongxiaoxi.defaultProps = {
  size: 20,
};

IconFasongxiaoxi = React.memo ? React.memo(IconFasongxiaoxi) : IconFasongxiaoxi;

export default IconFasongxiaoxi;
