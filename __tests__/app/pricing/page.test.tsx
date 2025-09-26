/*
 * @FilePath: \e-learning-educational-case\__tests__\app\pricing\page.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-26 19:02:37
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-26 19:03:56
 */
import Pricing from "@/app/pricing/page";
import { render, screen } from "@testing-library/react";

describe("Pricing Page", () => {
  it("render Pricing Page content", () => {
    render(<Pricing />);

    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });
});
