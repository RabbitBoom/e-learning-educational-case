/*
 * @FilePath: \e-learning-educational-case\__tests__\app\courses\page.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-26 19:00:41
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-26 19:01:59
 */
import Courses from "@/app/courses/page";
import { render, screen } from "@testing-library/react";

describe("Courses Page", () => {
  it("render Courses Page content", () => {
    render(<Courses />);
    expect(screen.getByText("Courses")).toBeInTheDocument();
  });
});
