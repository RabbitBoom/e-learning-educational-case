/*
 * @FilePath: \e-learning-educational-case\__tests__\hooks\storesHooks.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-13 18:19:00
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-13 18:27:56
 */
import { useAppDispatch, useAppSelector } from "@/hooks/storesHooks";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("storesHooks", () => {
  // Mock Redux store and dispatch
  const mockDispatch = jest.fn();
  const mockState = { test: "value" };
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(mockState);
    store.dispatch = mockDispatch;
  });

  it("should use the app dispatch", () => {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(store.dispatch);
  });

  it("should use the app selector", () => {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useAppSelector((state) => state.test), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe("value");
  });
});
