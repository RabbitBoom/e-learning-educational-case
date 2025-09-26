/*
 * @FilePath: \e-learning-educational-case\__tests__\components\ThemeSwitch.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:04:10
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-25 21:29:49
 */

import ThemeSwitch from "@/components/ThemeSwitch";
import { useLocalStorage } from "@reactuses/core";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock @reactuses/core
jest.mock("@reactuses/core", () => ({
  useLocalStorage: jest.fn(),
}));

// Mock Icon Component
jest.mock("@/components/Icon", () => {
  return jest.fn(({ icon, className }) => (
    <div data-testid={`icon-${icon}`} className={className} />
  ));
});

describe("ThemeSwitch", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with light theme by default", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["light", mockSetTheme]);

    render(<ThemeSwitch />);

    expect(screen.getByTestId("icon-Sun")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Sun")).toHaveClass("size-8 text-orange-50");

    const button = screen.getByRole("button", { name: /toggle color scheme/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with dark theme when stored theme is dark", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["dark", mockSetTheme]);

    render(<ThemeSwitch />);

    expect(screen.getByTestId("icon-Moon")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Moon")).toHaveClass(
      "size-8 text-orange-50"
    );
  });

  it("sets data-theme attribute on document element when theme changes", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["light", mockSetTheme]);

    render(<ThemeSwitch />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    (useLocalStorage as jest.Mock).mockReturnValue(["dark", mockSetTheme]);
    render(<ThemeSwitch />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("toggles theme when button is clicked", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["light", mockSetTheme]);

    const { rerender } = render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: /toggle color scheme/i });

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");

    mockSetTheme.mockClear();

    (useLocalStorage as jest.Mock).mockReturnValue(["dark", mockSetTheme]);

    rerender(<ThemeSwitch />);

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("handles null theme value by defaulting to light", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([null, mockSetTheme]);

    render(<ThemeSwitch />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("uses correct localStorage key", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["light", mockSetTheme]);

    render(<ThemeSwitch />);

    expect(useLocalStorage).toHaveBeenCalledWith("System.theme", "light");
  });
});
