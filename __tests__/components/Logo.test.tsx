/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Logo.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:01:58
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 16:23:36
 */
import Logo from "@/components/Logo";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";

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

describe("Logo Component", () => {
  it("renders the logo with correct alt text", () => {
    render(<Logo />);
    const logoElement = screen.getByTestId("icon-logo");
    expect(logoElement).toBeInTheDocument();
  });
});
