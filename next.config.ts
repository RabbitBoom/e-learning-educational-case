/*
 * @FilePath: \e-learning-educational-case\next.config.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-12 23:37:18
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-18 17:43:45
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
