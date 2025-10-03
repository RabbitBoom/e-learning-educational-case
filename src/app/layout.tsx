/*
 * @FilePath: /e-learning-educational-case/src/app/layout.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-12 23:37:18
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-10-02 20:05:45
 */

import "@/styles/tailwindcss.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  fallback: ["Arial", "Helvetica", "sans-serif"],
  variable: "--font-be_vietnam_pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Learning Educational",
  description:
    "A showcase of front-end development skills using Next.js, Redux/Toolkit, Framer Motion, TypeScript, Shadcn/UI, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="body">
        <Header />
      <main>{children}</main>
      <Footer />
      </body>
    </html>
  );
}
