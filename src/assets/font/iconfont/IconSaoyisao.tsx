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

let IconSaoyisao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M149.333333 170.858667A21.546667 21.546667 0 0 1 170.858667 149.333333H384V106.666667H170.858667A64.213333 64.213333 0 0 0 106.666667 170.858667V384h42.666666V170.858667zM170.858667 874.666667A21.546667 21.546667 0 0 1 149.333333 853.141333V640H106.666667v213.141333A64.213333 64.213333 0 0 0 170.858667 917.333333H384v-42.666666H170.858667zM853.12 149.333333A21.546667 21.546667 0 0 1 874.666667 170.858667V384h42.666666V170.858667A64.213333 64.213333 0 0 0 853.141333 106.666667H640v42.666666h213.141333zM874.666667 853.141333A21.546667 21.546667 0 0 1 853.141333 874.666667H640v42.666666h213.141333A64.213333 64.213333 0 0 0 917.333333 853.141333V640h-42.666666v213.141333zM106.666667 490.666667h810.666666v42.666666H106.666667v-42.666666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </Svg>
  );
};

IconSaoyisao.defaultProps = {
  size: 20,
};

IconSaoyisao = React.memo ? React.memo(IconSaoyisao) : IconSaoyisao;

export default IconSaoyisao;
