/*
 * @FilePath: \e-learning-educational-case\__tests__\page.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:17:36
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-12 18:35:02
 */
import Page from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("page", () => {
  it("renders a page", () => {
    render(<Page />);
    const linkButton = screen.getByRole("link", { name: /Deploy now/i });
    expect(linkButton).toBeInTheDocument();
  });
});
