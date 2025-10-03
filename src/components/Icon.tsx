/*
 * @FilePath: /e-learning-educational-case/src/components/Icon.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-18 19:44:11
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-10-03 16:07:46
 */
import { ComponentProps } from "react";
import * as AllIcons from "./iconsMap";

type IconName = keyof typeof AllIcons;

export default function Icon({
  icon,
  className = "",
  ...props
}: ComponentProps<"span"> & { icon: IconName }) {
  const Svg = AllIcons[icon];
  return (
    <span className={`icon-svg ${className}`} {...props}>
      <Svg />
    </span>
  );
}
