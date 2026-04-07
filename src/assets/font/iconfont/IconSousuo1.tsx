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

let IconSousuo1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M852.28885333 800.85788445l-35.99473778 36.02204444 168.18289778 168.16014222 35.9936-35.9936-168.18176-168.18858666z m0 0M449.75445333 3.89916445c-246.016 0-445.45137778 199.40807111-445.45137778 445.45137777 0 245.99210667 199.43537778 445.44796445 445.45137778 445.44796445 246.01486222 0 445.45024-199.45699555 445.45024-445.44796445 0-246.04330667-199.43537778-445.45137778-445.45024-445.45137777z m0 839.9917511c-217.90492445 0-394.54378667-176.63886222-394.54378666-394.54037333 0-217.90378667 176.63886222-394.54151111 394.54378666-394.54151111 217.90606222 0 394.54378667 176.63886222 394.54378667 394.54151111 0 217.90151111-176.63772445 394.54037333-394.54378667 394.54037333z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSousuo1.defaultProps = {
  size: 20,
};

IconSousuo1 = React.memo ? React.memo(IconSousuo1) : IconSousuo1;

export default IconSousuo1;
