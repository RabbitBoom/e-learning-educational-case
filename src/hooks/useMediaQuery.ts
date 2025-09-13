/*
 * @FilePath: \e-learning-educational-case\src\hooks\useMediaQuery.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-13 18:07:02
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-13 18:40:07
 */
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    media.addEventListener?.("change", listener);

    return () => {
      media.removeEventListener?.("change", listener);
    };
  }, [query]);

  return matches;
}
