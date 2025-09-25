/*
 * @FilePath: \e-learning-educational-case\next.config.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-12 23:37:18
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-25 08:17:13
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: process.env.NODE_ENV === 'production' ? true : false,
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
