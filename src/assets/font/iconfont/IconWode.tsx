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

let IconWode: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M611.4453125 484.5453125C687.85625 444.396875 740 364.30625 740 272c0-132.5484375-107.4515625-240-240-240s-240 107.4515625-240 240c0 95.2875 55.528125 177.6 135.99375 216.3515625C186.95 540.2421875 32 729.115625 32 954.209375c0 12.7209375 0.5015625 25.321875 1.471875 37.790625h48.1921875a436.125 436.125 0 0 1-1.6640625-37.790625c0-238.59375 193.4109375-432.005625 432-432.005625S944 715.615625 944 954.209375c0 12.7359375-0.5859375 25.335-1.663125 37.790625h48.1865625a486.9459375 486.9459375 0 0 0 1.4765625-37.790625c0-231-163.1859375-423.8625-380.5546875-469.6640625zM308 272c0-106.040625 85.959375-192 192-192C606.040625 80 692 165.959375 692 272s-85.959375 192-192 192c-106.040625 0-192-85.959375-192-192z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconWode.defaultProps = {
  size: 20,
};

IconWode = React.memo ? React.memo(IconWode) : IconWode;

export default IconWode;
