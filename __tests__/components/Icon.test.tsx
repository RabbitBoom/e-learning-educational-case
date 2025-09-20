/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Icon.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 17:03:11
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 17:05:57
 */
import Icon from "@/components/Icon";
import { render, screen } from "@testing-library/react";

// Mock next/dynamic
jest.mock("next/dynamic", () => () => {
  const Component = () => <span data-testid="mock-svg" />;
  return Component;
});

describe("Icon component", () => {
  it("renders with given icon prop", () => {
    render(<Icon icon="test-icon" className="my-class" />);

    const wrapper = screen.getByText(
      (content, element) => !!element && element.classList.contains("icon-svg")
    );
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("my-class");

    expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
  });
});
