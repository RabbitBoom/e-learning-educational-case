/*
 * @FilePath: \e-learning-educational-case\__tests__\hooks\useMediaQuery.test.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-13 18:14:04
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-13 19:14:39
 */
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { act, renderHook } from "@testing-library/react";

describe("useMediaQuery hook", () => {
  let listener: ((e: MediaQueryListEvent) => void) | null = null;

  const mockMatchMedia = (matches: boolean) =>
    ({
      matches,
      media: "(min-width: 390px)",
      addEventListener: (
        event: "change",
        cb: (e: MediaQueryListEvent) => void
      ) => {
        listener = cb;
      },
      removeEventListener: jest.fn(),
    } as unknown as MediaQueryList);

  beforeEach(() => {
    listener = null;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(false)),
    });
  });

  it("should handle initial false", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 390px)"));
    expect(result.current).toBe(false);
  });

  it("should handle change to true", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 390px)"));

    act(() => listener?.({ matches: true } as MediaQueryListEvent));
    expect(result.current).toBe(true);
  });

  it("should cover SSR branch (window undefined)", () => {
    const originalWindow = global.window;
    // @ts-expect-error: Simulate SSR by making window undefined
    delete global.window;
    const { result } = renderHook(() => useMediaQuery("(min-width: 390px)"));
    expect(result.current).toBe(false);
    global.window = originalWindow;
  });

  it("should cover no matchMedia branch", () => {
    const originalMatchMedia = window.matchMedia;
    // @ts-expect-error: Simulate no matchMedia support
    window.matchMedia = undefined;
    const { result } = renderHook(() => useMediaQuery("(min-width: 390px)"));
    expect(result.current).toBe(false);
    window.matchMedia = originalMatchMedia;
  });
});
