/*
 * @FilePath: \e-learning-educational-case\__tests__\layout.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:46:43
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-25 20:20:41
 */

import RootLayout, { BodyLayout } from "@/app/layout";
import { render, screen } from "@testing-library/react";

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
  it("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <p>Root Child</p>
      </RootLayout>
    );

    expect(getByText("Root Child")).toBeInTheDocument();
  });
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
