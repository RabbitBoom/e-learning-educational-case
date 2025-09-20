/*
 * @FilePath: \e-learning-educational-case\__tests__\components\ThemeSwitch.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-20 00:04:10
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 16:45:14
 */
import ThemeSwitch, { _test_toggleTheme } from "@/components/ThemeSwitch";
import systemReducer, { setTheme } from "@/stores/System";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});

type SystemState = {
  theme: "light" | "dark";
};

const createStore = (theme: "light" | "dark") =>
  configureStore({
    reducer: { system: systemReducer },
    preloadedState: { system: { theme } as SystemState },
  });

type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
type AppDispatch = ReturnType<typeof createStore>["dispatch"];

describe("_test_toggleTheme function", () => {
  it("dispatches dark when theme is light", () => {
    const dispatch = jest.fn();
    _test_toggleTheme(dispatch, "light");
    expect(dispatch).toHaveBeenCalledWith(setTheme("dark"));
  });

  it("dispatches light when theme is dark", () => {
    const dispatch = jest.fn();
    _test_toggleTheme(dispatch, "dark");
    expect(dispatch).toHaveBeenCalledWith(setTheme("light"));
  });
});

describe("ThemeSwitch component", () => {
  let store: ReturnType<typeof createStore>;

  const renderWithStore = (theme: "light" | "dark") => {
    store = createStore(theme);
    return render(
      <Provider store={store}>
        <ThemeSwitch />
      </Provider>
    );
  };

  it("renders sun icon when theme is light", () => {
    renderWithStore("light");
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
  });

  it("renders moon icon when theme is dark", () => {
    renderWithStore("dark");
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });

  it("dispatches setTheme(dark) when theme is light and clicked", async () => {
    renderWithStore("light");
    const button = screen.getByLabelText("toggle color scheme");
    await userEvent.click(button);

    const state: RootState = store.getState();
    expect(state.system.theme).toBe("dark");
  });

  it("dispatches setTheme(light) when theme is dark and clicked", async () => {
    renderWithStore("dark");
    const button = screen.getByLabelText("toggle color scheme");
    await userEvent.click(button);

    const state: RootState = store.getState();
    expect(state.system.theme).toBe("light");
  });
});
