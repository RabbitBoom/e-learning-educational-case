/*
 * @FilePath: /e-learning-educational-case/__tests__/app/layout.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:46:43
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-10-02 20:18:10
 */

import RootLayout from "@/app/layout";
import { render } from "@testing-library/react";

// Mock Next.js font
jest.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({ variable: "mock-font-variable" }),
}));

// mock Header Component
jest.mock("@/components/Header", () => {
  const mockHeader = () => <header>Header</header>;
  mockHeader.displayName = "mockHeader";
  return mockHeader;
});

// Mock Footer Component
jest.mock("@/components/Footer", () => {
  const mockFooter = () => <footer>Footer</footer>;
  mockFooter.displayName = "mockFooter";
  return mockFooter;
});

describe("RootLayout", () => {
  test("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <p>Root Child</p>
      </RootLayout>,
      {
        container: document,
      }
    );

    expect(getByText("Root Child")).toBeInTheDocument();
  });
});
