/*
 * @FilePath: \e-learning-educational-case\src\components\Header.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 08:50:20
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-19 18:12:35
 */
import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <Link href="/">
        <h2 className="topic">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <Icon icon="arrow-right" />
        </h2>
      </Link>
      <div className="content">
        <Logo />
        <div className="right">
          <ThemeSwitch />
          <Icon className="size-10" icon="menu" aria-label="toggle menu" />
        </div>
      </div>
    </header>
  );
}
