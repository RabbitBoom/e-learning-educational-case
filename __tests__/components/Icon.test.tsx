/*
 * @FilePath: \e-learning-educational-case\__tests__\components\Icon.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 17:03:11
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 18:06:17
 */
import Icon from "@/components/Icon";
import { render, screen } from "@testing-library/react";

// Mock next/dynamic
jest.mock("next/dynamic", () => () => {
  const Component = () => <span data-testid="mock-svg" />;
  return Component;
});

// Mock IconsMap fetch icons data
jest.mock("@/components/iconsMap", () => ({
  Sun: () => <svg data-testid="svg-Sun" />,
  Moon: () => <svg data-testid="svg-Moon" />,
  Logo: () => <svg data-testid="svg-Logo" />,
}));

describe("Icon", () => {
  it("renders the correct SVG when icon exists", () => {
    render(<Icon icon="Sun" />);

    const svg = screen.getByTestId("svg-Sun");
    expect(svg).toBeInTheDocument();
  });

  it("renders null when icon does not exist", () => {
    type NonExistentIcon = "NonExistent" & string;
    render(<Icon icon={"NonExistent" as NonExistentIcon} />);
    const svg = screen.queryByTestId("svg-NonExistent");
    expect(svg).not.toBeInTheDocument();
  });

  it("applies className and other span props", () => {
    render(<Icon icon="Moon" className="custom-class" title="moon icon" />);

    const span = screen.getByTitle("moon icon");
    expect(span).toHaveClass("icon-svg custom-class");
  });
});

