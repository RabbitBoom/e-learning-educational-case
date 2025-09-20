/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Header.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:00:15
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 16:22:34
 */
import Header from "@/components/Header";

import { store } from "@/stores/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

jest.mock("@/components/ThemeSwitch", () => {
  const MockThemeSwitch = () => <div>MockThemeSwitch</div>;
  MockThemeSwitch.displayName = "MockThemeSwitch";
  return MockThemeSwitch;
});

jest.mock("next/link", () => {
  return ({ children }: { children: ReactNode }) => children;
});

jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});
jest.mock("@/components/Logo", () => {
  const MockLogo = () => <div data-testid="logo" />;
  MockLogo.displayName = "MockLogo";
  return MockLogo;
});

describe("Header Component", () => {
  it("renders the header with correct text", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const headerElement = screen.getByText(
      /Free Courses 🌟 Sale Ends Soon, Get It Now/i
    );
    expect(headerElement).toBeInTheDocument();
  });
});
