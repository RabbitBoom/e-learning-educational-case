/*
 * @FilePath: \e-learning-educational-case\src\components\Logo.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-19 18:09:49
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 00:01:38
 */
import Link from "next/link";
import Icon from "./Icon";
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Logo link to Home page"
      className={`logo ${className}`}
      title="Link to Home"
    >
      <h1>E-Learning Platform</h1>
      <Icon icon="logo" aria-label="E-Learning Platform Logo" />
    </Link>
  );
}
