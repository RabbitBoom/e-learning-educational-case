/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Footer.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-19 23:58:07
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 01:01:33
 */
import Footer from "@/components/Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReactNode } from 'react';

jest.mock("next/link", () => {
  return ({ children }: {children: ReactNode}) => children;
});

jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: {icon: string}) => <span data-testid={`icon-${icon}`} />;
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});
jest.mock("@/components/Logo", () => {
  const MockLogo = () => <div data-testid="logo" />;
  MockLogo.displayName = "MockLogo";
  return MockLogo;
});

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });


  it("renders copyright text", () => {
    expect(screen.getByText(/© 2025 Skillbridge\. All rights reserved\./i)).toBeInTheDocument();
  });
});
