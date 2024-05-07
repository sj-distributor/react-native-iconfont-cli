/* eslint-disable */

import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <style type="text/css">
    <![CDATA[

        circle {
           stroke: #006600;
           fill:   #00cc00;
        }

      ]]>
  </style>
  <circle cx="40" cy="40" r="24"/>
</svg>
`;

let IconInlineStyle = ({ size = 18, color, ...rest }) => {
  return <SvgCss xml={xml} width={size} height={size} {...rest} />;
};

IconInlineStyle = React.memo ? React.memo(IconInlineStyle) : IconInlineStyle;

export default IconInlineStyle;
