/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconSaoyisao from './IconSaoyisao';
import IconShangcheng from './IconShangcheng';
import IconZengjiatianjiajiahao from './IconZengjiatianjiajiahao';
import IconSangedian from './IconSangedian';
import IconSousuo1 from './IconSousuo1';
import IconQingchu from './IconQingchu';
import IconJiahaoO from './IconJiahaoO';
import IconErweima from './IconErweima';
import IconYoujiantou from './IconYoujiantou';
import IconDuoyuyan from './IconDuoyuyan';
import IconShezhi from './IconShezhi';
import IconFasongxiaoxi from './IconFasongxiaoxi';
import IconShengyin from './IconShengyin';
import IconXiaolian from './IconXiaolian';
import IconWode from './IconWode';
import IconGlBubble from './IconGlBubble';
import IconIconEyeOpenCopy from './IconIconEyeOpenCopy';
import IconIconEyeCloseCopy from './IconIconEyeCloseCopy';
import IconDaobanCopy from './IconDaobanCopy';
import IconXiangzuojiantou from './IconXiangzuojiantou';
export { default as IconSaoyisao } from './IconSaoyisao';
export { default as IconShangcheng } from './IconShangcheng';
export { default as IconZengjiatianjiajiahao } from './IconZengjiatianjiajiahao';
export { default as IconSangedian } from './IconSangedian';
export { default as IconSousuo1 } from './IconSousuo1';
export { default as IconQingchu } from './IconQingchu';
export { default as IconJiahaoO } from './IconJiahaoO';
export { default as IconErweima } from './IconErweima';
export { default as IconYoujiantou } from './IconYoujiantou';
export { default as IconDuoyuyan } from './IconDuoyuyan';
export { default as IconShezhi } from './IconShezhi';
export { default as IconFasongxiaoxi } from './IconFasongxiaoxi';
export { default as IconShengyin } from './IconShengyin';
export { default as IconXiaolian } from './IconXiaolian';
export { default as IconWode } from './IconWode';
export { default as IconGlBubble } from './IconGlBubble';
export { default as IconIconEyeOpenCopy } from './IconIconEyeOpenCopy';
export { default as IconIconEyeCloseCopy } from './IconIconEyeCloseCopy';
export { default as IconDaobanCopy } from './IconDaobanCopy';
export { default as IconXiangzuojiantou } from './IconXiangzuojiantou';

export type IconNames = 'saoyisao' | 'shangcheng' | 'zengjiatianjiajiahao' | 'sangedian' | 'sousuo1' | 'qingchu' | 'jiahao_o' | 'erweima' | 'youjiantou' | 'duoyuyan' | 'shezhi' | 'fasongxiaoxi' | 'shengyin' | 'xiaolian' | 'wode' | 'gl-bubble' | 'icon-eye-open-copy' | 'icon-eye-close-copy' | 'daoban-copy' | 'xiangzuojiantou';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'saoyisao':
      return <IconSaoyisao key="1" {...rest} />;
    case 'shangcheng':
      return <IconShangcheng key="2" {...rest} />;
    case 'zengjiatianjiajiahao':
      return <IconZengjiatianjiajiahao key="3" {...rest} />;
    case 'sangedian':
      return <IconSangedian key="4" {...rest} />;
    case 'sousuo1':
      return <IconSousuo1 key="5" {...rest} />;
    case 'qingchu':
      return <IconQingchu key="6" {...rest} />;
    case 'jiahao_o':
      return <IconJiahaoO key="7" {...rest} />;
    case 'erweima':
      return <IconErweima key="8" {...rest} />;
    case 'youjiantou':
      return <IconYoujiantou key="9" {...rest} />;
    case 'duoyuyan':
      return <IconDuoyuyan key="10" {...rest} />;
    case 'shezhi':
      return <IconShezhi key="11" {...rest} />;
    case 'fasongxiaoxi':
      return <IconFasongxiaoxi key="12" {...rest} />;
    case 'shengyin':
      return <IconShengyin key="13" {...rest} />;
    case 'xiaolian':
      return <IconXiaolian key="14" {...rest} />;
    case 'wode':
      return <IconWode key="15" {...rest} />;
    case 'gl-bubble':
      return <IconGlBubble key="16" {...rest} />;
    case 'icon-eye-open-copy':
      return <IconIconEyeOpenCopy key="17" {...rest} />;
    case 'icon-eye-close-copy':
      return <IconIconEyeCloseCopy key="18" {...rest} />;
    case 'daoban-copy':
      return <IconDaobanCopy key="19" {...rest} />;
    case 'xiangzuojiantou':
      return <IconXiangzuojiantou key="20" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
