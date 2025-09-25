/*
 * @FilePath: \e-learning-educational-case\__tests__\layout.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:46:43
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 17:52:07
 */

import { BodyLayout } from "@/app/layout";
import { render, screen } from "@testing-library/react";

// Mock Next.js font
jest.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({ variable: "mock-font-variable" }),
}));

// mock Header/Footer 避免实际渲染
jest.mock("@/components/Header", () => {
  const mockHeader = () => <header>Header</header>;
  mockHeader.displayName = "mockHeader";
  return mockHeader;
});
jest.mock("@/components/Footer", () => {
  const mockFooter = () => <footer>Footer</footer>;
  mockFooter.displayName = "mockFooter";
  return mockFooter;
});

describe("BodyLayout", () => {
  it("renders children inside main", () => {
    render(
      <BodyLayout>
        <div>Test Child</div>
      </BodyLayout>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
