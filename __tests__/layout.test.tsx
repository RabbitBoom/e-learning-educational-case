/*
 * @FilePath: \e-learning-educational-case\__tests__\layout.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 18:46:43
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-12 18:47:31
 */

import Layout from "@/app/layout";
import { render, screen } from "@testing-library/react";

describe("RootLayout", () => {
  it("renders a layout", () => {
    render(<Layout><div>Test Child</div></Layout>);
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
