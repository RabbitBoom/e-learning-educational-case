/*
 * @FilePath: \e-learning-educational-case\__tests__\components\ThemeSwitch.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:04:10
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 17:59:37
 */

import ThemeSwitch from "@/components/ThemeSwitch";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// mock icon component
jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});

// mock useLocalStorage
jest.mock("@reactuses/core", () => ({
  useLocalStorage: <T,>(
    _key: string,
    initialValue: T
  ): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = React.useState<T>(initialValue);
    return [state, setState];
  },
}));

describe("ThemeSwitch", () => {
  it("renders with light theme by default", () => {
    render(<ThemeSwitch />);
    expect(screen.getByTestId("icon-Sun")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("toggles to dark theme when clicked", () => {
    render(<ThemeSwitch />);
    const button = screen.getByRole("button", { name: /toggle color scheme/i });

    fireEvent.click(button);

    expect(screen.getByTestId("icon-Moon")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("toggles back to light theme when clicked twice", () => {
    render(<ThemeSwitch />);
    const button = screen.getByRole("button", { name: /toggle color scheme/i });

    fireEvent.click(button); // dark
    fireEvent.click(button); // light

    expect(screen.getByTestId("icon-Sun")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
