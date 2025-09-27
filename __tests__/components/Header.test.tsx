/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Header.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:00:15
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-27 22:58:41
 */
import Header from "@/components/Header";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";

// Mock ThemeSwitch Component
jest.mock("@/components/ThemeSwitch", () => ({
  __esModule: true,
  default: () => <button data-testid="mock-theme-switch">ThemeSwitch</button>,
}));

// Mock next Link 组件
jest.mock("next/link", () => {
  const mockLink = ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  mockLink.displayName = "mockLink";
  return mockLink;
});

// Mock Icon Component
jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});

// Mock Logo Component
jest.mock("@/components/Logo", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-logo">Logo</div>,
}));

// Mock NavMenu component
jest.mock("@/components/NavMenu", () => {
  const NavMenu: React.FC<React.PropsWithChildren<{ children: ReactNode }>> = ({
    children,
  }) => <nav>{children}</nav>;
  const NavMenuTrigger: React.FC = () => <button>Trigger</button>;
  const NavMenuWrap: React.FC<
    React.PropsWithChildren<{ children: ReactNode }>
  > = ({ children }) => <div>{children}</div>;
  const NavMenuLink: React.FC<
    React.PropsWithChildren<{
      href: string;
      className?: string;
      target?: string;
      "aria-label"?: string;
      title?: string;
    }>
  > = ({ children, ...props }) => <a {...props}>{children}</a>;

  return { NavMenu, NavMenuTrigger, NavMenuWrap, NavMenuLink };
});

describe("Header", () => {
  it("renders header content", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", {
      name: /free courses 🌟 sale ends soon, get it now/i,
    });
    expect(heading).toBeInTheDocument();

    // Logo
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();

    // ThemeSwitch
    expect(screen.getByTestId("mock-theme-switch")).toBeInTheDocument();

    // NavMenu links
    const navNames = ["Home", "Courses", "About Us", "Pricing", "Contact"];
    navNames.forEach((name) => {
      const link = screen.getByRole("link", { name: `${name} Link` });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href");
    });
  });
});
