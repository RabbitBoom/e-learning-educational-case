/*
 * @FilePath: \e-learning-educational-case\src\components\Header.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 08:50:20
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-24 22:54:27
 */
import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import { NavMenu, NavMenuLink, NavMenuTrigger, NavMenuWrap } from "./NavMenu";
import ThemeSwitch from "./ThemeSwitch";

export type NavsType = Array<Record<"name" | "url", string>>;

const navArr: NavsType = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

export default function Header() {
  return (
    <header>
      <h2 className="topic">
        <Link href="/">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <Icon className="ml-3 animate-going" icon="ArrowRight" />
        </Link>
      </h2>
      <div className="content">
        <Logo />
        <div className="right">
          <ThemeSwitch />
          <NavMenu>
            <NavMenuTrigger />
            <NavMenuWrap>
              {navArr.map((nav) => {
                return (
                  <NavMenuLink
                    className="nav-link"
                    href={nav.url}
                    target="_self"
                    aria-label={`${nav.name} Link`}
                    title={`${nav.name} Link`}
                    key={nav.name}
                  >
                    <span>{nav.name}</span>
                  </NavMenuLink>
                );
              })}
            </NavMenuWrap>
          </NavMenu>
        </div>
      </div>
    </header>
  );
}
