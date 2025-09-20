/*
 * @FilePath: \e-learning-educational-case\__tests__\layout.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:46:43
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 17:00:22
 */

import Layout from "@/app/layout";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";

// Mock Next.js font
jest.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({ variable: "mock-font-variable" }),
}));

// Mock components
jest.mock("@/stores/StoreProvider", () => {
  const MockStoreProvider = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  MockStoreProvider.displayName = "MockStoreProvider";
  return MockStoreProvider;
});
jest.mock("@/components/Header", () => {
  const MockHeader = () => <header>Header</header>;
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});
jest.mock("@/components/Footer", () => {
  const MockFooter = () => <footer>Footer</footer>;
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});

describe("RootLayout", () => {
  it("renders a layout", () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
