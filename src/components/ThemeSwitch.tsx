/*
 * @FilePath: \e-learning-educational-case\src\components\ThemeSwitch.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 15:51:21
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-18 23:05:39
 */
"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/storesHooks";
import { setTheme } from "@/stores/System";
import { useEffect } from "react";
import Icon from "./Icon";

export default function ThemeSwitch() {
  const theme = useAppSelector((state) => state.system.theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };
  return (
    <button aria-label="toggle color scheme">
      {theme === "light" ? (
        <Icon
          icon="sun"
          className="size-8 text-orange-50"
          onClick={toggleTheme}
        />
      ) : (
        <Icon
          icon="moon"
          className="size-8 text-orange-50"
          onClick={toggleTheme}
        />
      )}
    </button>
  );
}
