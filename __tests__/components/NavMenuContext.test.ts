import { useNavMenuProviderValue } from "@/components/NavMenuContext";
import * as ReactUses from "@reactuses/core";
import { act, renderHook } from "@testing-library/react";

jest.mock("@reactuses/core");
jest.mock("motion/react");

describe("useNavMenuProviderValue", () => {
  const useMediaQueryMock = ReactUses.useMediaQuery as jest.Mock;

  beforeEach(() => {
    document.body.className = "";
    jest.clearAllMocks();
  });

  describe("when matches = false (mobile)", () => {
    beforeEach(() => {
      useMediaQueryMock.mockReturnValue(false);
    });

    it("initial state should be correct", () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      expect(result.current.show).toBe(false);
      expect(result.current.maskStyle).toEqual({});
      expect(typeof result.current.setShow).toBe("function");
      expect(typeof result.current.setMaskStyle).toBe("function");
    });

    it("openMethod should set show to true and add body class", () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      act(() => {
        result.current.openMethod();
      });

      expect(result.current.show).toBe(true);
      expect(document.body.classList.contains("overflow-hidden")).toBe(true);
    });

    it("closeMethod should set show to false and remove body class", async () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      act(() => {
        result.current.openMethod();
      });

      await act(async () => {
        await result.current.closeMethod();
      });

      expect(result.current.show).toBe(false);
      expect(document.body.classList.contains("overflow-hidden")).toBe(false);
    });

    it("setMaskStyle should update the maskStyle state", () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      const style: Partial<DOMRect> = { top: 10, left: 20 };

      act(() => {
        result.current.setMaskStyle(style);
      });

      expect(result.current.maskStyle).toEqual(style);
    });
  });

  describe("when matches = true (desktop)", () => {
    beforeEach(() => {
      useMediaQueryMock.mockReturnValue(true);
    });

    it("openMethod should do nothing when matches = true", () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      act(() => {
        result.current.openMethod();
      });

      expect(result.current.show).toBe(false);
      expect(document.body.classList.contains("overflow-hidden")).toBe(false);
    });

    it("closeMethod should do nothing when matches = true", async () => {
      const { result } = renderHook(() => useNavMenuProviderValue());

      act(() => {
        result.current.setShow(true); // manually set show
      });

      await act(async () => {
        await result.current.closeMethod();
      });

      expect(result.current.show).toBe(true); // still true
      expect(document.body.classList.contains("overflow-hidden")).toBe(false);
    });
  });
});
