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

let IconIconEyeCloseCopyCopy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928.312889 267.477333C792.078222 436.906667 655.957333 519.111111 519.651556 519.111111c-136.832 0-278.584889-82.773333-425.031112-252.913778a49.777778 49.777778 0 1 0-75.463111 64.938667C182.826667 521.287111 349.596444 618.666667 519.637333 618.666667c170.609778 0 332.785778-97.934222 486.257778-288.810667a49.777778 49.777778 0 0 0-77.582222-62.378667z"
        fill={getIconColor(color, 0, '#00e5ff')}
      />
      <Path
        d="M162.730667 469.447111l-94.819556 109.710222a35.555556 35.555556 0 1 0 53.802667 46.506667l94.819555-109.710222a35.555556 35.555556 0 0 0-53.802666-46.506667zM354.247111 598.186667l-37.930667 151.708444a35.555556 35.555556 0 0 0 68.992 17.251556l37.930667-151.708445a35.555556 35.555556 0 0 0-68.992-17.251555zM629.575111 604.387556l53.333333 151.694222a35.555556 35.555556 0 0 0 67.072-23.580445l-53.333333-151.694222a35.555556 35.555556 0 0 0-67.072 23.580445zM823.111111 475.164444l109.710222 109.724445a35.555556 35.555556 0 0 0 50.289778-50.289778l-109.710222-109.710222a35.555556 35.555556 0 0 0-50.289778 50.289778z"
        fill={getIconColor(color, 1, '#00e5ff')}
      />
    </Svg>
  );
};

IconIconEyeCloseCopyCopy.defaultProps = {
  size: 20,
};

IconIconEyeCloseCopyCopy = React.memo ? React.memo(IconIconEyeCloseCopyCopy) : IconIconEyeCloseCopyCopy;

export default IconIconEyeCloseCopyCopy;
