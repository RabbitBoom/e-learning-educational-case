/*
 * @FilePath: \e-learning-educational-case\src\components\Logo.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-19 18:09:49
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-19 19:44:15
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
      <h1>Skillbridge</h1>
      <Icon icon="logo" aria-label="Skillbridge Logo" />
    </Link>
  );
}
