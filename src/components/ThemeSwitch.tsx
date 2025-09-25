/*
 * @FilePath: \e-learning-educational-case\src\components\ThemeSwitch.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 15:51:21
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-24 20:26:32
 */
"use client";
import { useLocalStorage } from "@reactuses/core";
import { useEffect } from "react";
import Icon from "./Icon";

export default function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "System.theme",
    "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme ?? "light");
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      className="theme-switch"
      aria-label="toggle color scheme"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Icon icon="Sun" className="size-8 text-orange-50" />
      ) : (
        <Icon icon="Moon" className="size-8 text-orange-50" />
      )}
    </button>
  );
}

/* export const _test_toggleTheme = (
  dispatch: AppDispatch,
  theme: "light" | "dark"
) => {
  dispatch(setTheme(theme === "light" ? "dark" : "light"));
}; */
