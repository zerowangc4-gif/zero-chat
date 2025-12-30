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

let IconDuihao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M414.245926 751.028148l437.57037-453.12c7.300741-7.49037 7.111111-19.531852-0.474074-26.832593-7.49037-7.300741-19.531852-7.111111-26.832593 0.474074L398.506667 712.722963 199.111111 513.327407c-7.395556-7.395556-19.437037-7.395556-26.832593 0l0 0c-7.395556 7.395556-7.395556 19.437037 0 26.832593l212.574815 212.574815c6.731852 6.731852 17.161481 7.300741 24.557037 1.896296C411.211852 753.682963 412.823704 752.545185 414.245926 751.028148z"
        fill={getIconColor(color, 0, '#272536')}
      />
    </Svg>
  );
};

IconDuihao.defaultProps = {
  size: 18,
};

IconDuihao = React.memo ? React.memo(IconDuihao) : IconDuihao;

export default IconDuihao;
