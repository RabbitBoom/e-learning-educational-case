/*
 * @FilePath: \e-learning-educational-case\__mocks__\@reactuses\core.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-27 13:14:16
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-27 22:57:19
 */
export const useMediaQuery = jest.fn(
  (query: string, defaultValue: boolean): boolean => {
    return defaultValue;
  }
);

export const useClickAway = jest.fn(
  (ref: React.RefObject<HTMLElement>, handler: () => void) => {
    ref.current = document.createElement("div");
    document.body.addEventListener("click", () => handler());
  }
);

export const useElementBounding = jest.fn(() => ({
  width: 100,
  height: 40,
  top: 0,
  left: 0,
}));

export const useWindowSize = jest.fn(() => ({
  width: 1024,
  height: 768,
}));
