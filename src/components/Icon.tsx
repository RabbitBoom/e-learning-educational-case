/*
 * @FilePath: \e-learning-educational-case\src\components\Icon.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-18 19:44:11
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-19 19:49:07
 */
"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";
export default function Icon({
  icon,
  className = "",
  ...props
}: ComponentProps<"span"> & { icon: string }) {
  const Svg = dynamic(() => import(`@/assets/svg/${icon}.svg`), { loading: () => null, ssr: false });
  return (
    <span className={`icon-svg ${className}`} {...props}>
      <Svg />
    </span>
  );
}
