/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Logo.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:01:58
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 18:03:30
 */
import Logo from "@/components/Logo";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// mock next Link component
jest.mock("next/link", () => {
  const mockLink = ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  mockLink.displayName = "mockLink";
  return mockLink;
});

// mock Icon component
jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});

describe("Logo", () => {
  it("renders the logo link to home", () => {
    render(<Logo />);

    const link = screen.getByRole("link", { name: /logo link to home page/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("title", "Link to Home");
  });

  it("renders the hidden heading with accessible name", () => {
    render(<Logo />);

    const heading = screen.getByRole("heading", {
      name: /E-Learning Platform/i,
    });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders the Logo icon", () => {
    render(<Logo />);
    expect(screen.getByTestId("icon-Logo")).toBeInTheDocument();
  });

  it("accepts and applies custom className", () => {
    render(<Logo className="custom-class" />);
    const link = screen.getByRole("link", { name: /logo link to home page/i });
    expect(link).toHaveClass("logo custom-class");
  });
});
