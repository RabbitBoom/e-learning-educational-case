/*
 * @FilePath: \e-learning-educational-case\__tests__\app\about\page.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-26 18:36:00
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-26 19:00:12
 */
import About from "@/app/about/page";
import { render, screen } from "@testing-library/react";

describe("About page", () => {
  it("render About content", () => {
    render(<About />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });
});
