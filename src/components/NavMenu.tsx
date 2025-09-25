/*
 * @FilePath: \e-learning-educational-case\src\components\NavMenu.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 18:23:47
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-24 23:26:14
 */
"use client";
import {
  useClickAway,
  useElementBounding,
  useWindowSize,
} from "@reactuses/core";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import { NAvMenuContext, useNavMenuProviderValue } from "./NavMenuContext";

export function NavMenu({ children }: { children?: ReactNode | ReactNode[] }) {
  const navMenuProviderVal = useNavMenuProviderValue();
  return (
    <NAvMenuContext.Provider value={navMenuProviderVal}>
      <div className="nav-section">{children}</div>
    </NAvMenuContext.Provider>
  );
}

export function NavMenuTrigger() {
  const { show, setShow } = useContext(NAvMenuContext);
  return (
    <button
      className="hover:text-orange-50 laptop:hidden"
      aria-label={show ? "close menu" : "open menu"}
      onClick={() => setShow(!show)}
    >
      <Icon className="size-10" icon={show ? "Close" : "Menu"} />
    </button>
  );
}

export function NavMenuWrap({ children }: { children?: ReactNode }) {
  const pathName = usePathname();
  const { width: winW } = useWindowSize();
  const menuRef = useRef<HTMLDivElement>(null);
  const [wrapStyle, setWrapStyle] = useState({ paddingTop: 0 });
  const { matches, show, setShow, maskStyle } = useContext(NAvMenuContext);

  useEffect(() => {
    const headerEl = document.querySelector("header");
    if (headerEl) {
      const { height } = headerEl.getBoundingClientRect();
      setWrapStyle({ paddingTop: height + 20 });
    }
  }, [winW]);

  useEffect(() => {
    setShow(false);
  }, [pathName]);

  useClickAway(menuRef, () => {
    setShow(false);
  });
  const navComp = (
    <div
      className="nav-content"
      aria-label="menus"
      aria-orientation={matches ? "horizontal" : "vertical"}
      aria-hidden={matches ? false : !show}
    >
      <div ref={menuRef} className="nav-wrap" style={!matches ? wrapStyle : {}}>
        <nav>{children}</nav>
        <div className="sign-btns"></div>
        <span
          className="nav-link-mask"
          style={matches ? maskStyle : {}}
          tabIndex={-1}
        ></span>
      </div>
    </div>
  );
  if (matches || typeof document === "undefined") return navComp;
  return createPortal(navComp, document.body);
}

export type NavMenuLinkProps = LinkProps<HTMLAnchorElement> & {
  target?: string;
  className?: string;
  title?: string;
  children?: ReactNode;
};

export function NavMenuLink({
  children,
  className = "",
  ...props
}: NavMenuLinkProps) {
  const pathName = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { matches, setMaskStyle } = useContext(NAvMenuContext);
  const { width, height } = useElementBounding(linkRef);
  useEffect(() => {
    if (!matches || pathName !== props?.href || !linkRef.current) return;
    const { offsetTop: top, offsetLeft: left } = linkRef.current;
    setMaskStyle((prev) => ({
      ...prev,
      width,
      height,
      top,
      left,
    }));
  }, [matches, pathName, props.href, height, width, setMaskStyle]);
  return (
    <Link
      ref={linkRef}
      className={clsx(className, pathName === props?.href && "nav-active")}
      {...props}
    >
      {children}
    </Link>
  );
}
