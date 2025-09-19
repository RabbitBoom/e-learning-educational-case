/*
 * @FilePath: \e-learning-educational-case\__tests__\stores\StoreProvider.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-17 19:23:43
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-17 19:24:33
 */
import StoreProvider from "@/stores/StoreProvider";
import { render } from "@testing-library/react";

describe("StoreProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
        <StoreProvider> 
            <div>Test Child</div>
        </StoreProvider>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});