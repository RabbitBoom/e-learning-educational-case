/*
 * @FilePath: \e-learning-educational-case\src\components\NavMenu.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 18:23:47
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 13:16:18
 */
"use client";
import {
  useClickAway,
  useElementBounding,
  useWindowSize,
} from "@reactuses/core";
import clsx from "clsx";
import { motion } from "motion/react";
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
  const menuContext = useContext(NAvMenuContext);
  return (
    <button
      className="hover:text-orange-50 laptop:hidden"
      aria-label={menuContext?.show ? "close menu" : "open menu"}
      onClick={() =>
        menuContext?.show
          ? menuContext?.closeMethod?.()
          : menuContext?.openMethod?.()
      }
    >
      <Icon className="size-10" icon={menuContext?.show ? "Close" : "Menu"} />
    </button>
  );
}

export function NavMenuWrap({ children }: { children?: ReactNode }) {
  const pathName = usePathname();
  const { width: winW } = useWindowSize();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContext = useContext(NAvMenuContext);
  const [wrapStyle, setWrapStyle] = useState({ paddingTop: 0 });

  useEffect(() => {
    const headerEl = document.querySelector("header");
    if (headerEl) {
      const { height } = headerEl.getBoundingClientRect();
      setWrapStyle({ paddingTop: height + 20 });
    }
  }, [winW]);

  useEffect(() => {
    menuContext.closeMethod?.();
  }, [pathName]);

  useClickAway(menuRef, () => {
    menuContext.closeMethod?.();
  });
  const navComp = (
    <motion.div
      initial="closed"
      animate={menuContext?.menuControls}
      className="nav-content"
      aria-label="menus"
      aria-orientation={menuContext?.matches ? "horizontal" : "vertical"}
      aria-expanded={menuContext?.matches ? true : menuContext?.show}
      aria-hidden={menuContext?.matches ? false : !menuContext?.show}
    >
      <motion.div
        initial="closed"
        animate={menuContext?.navWrapControls}
        ref={menuRef}
        className="nav-wrap"
        style={!menuContext?.matches ? wrapStyle : {}}
      >
        <nav>{children}</nav>
        <div className="sign-btns"></div>
        <span
          className="nav-link-mask"
          style={menuContext?.matches ? menuContext?.maskStyle : {}}
          tabIndex={-1}
        ></span>
      </motion.div>
    </motion.div>
  );
  if (menuContext?.matches || typeof document === "undefined") return navComp;
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
  const menuContext = useContext(NAvMenuContext);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { width, height } = useElementBounding(linkRef);
  useEffect(() => {
    if (!menuContext?.matches || pathName !== props?.href || !linkRef.current)
      return;
    const { offsetTop: top, offsetLeft: left } = linkRef.current;
    menuContext?.setMaskStyle?.({
      width,
      height,
      top,
      left,
    });
  }, [menuContext?.matches, pathName, props.href, height, width]);
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
