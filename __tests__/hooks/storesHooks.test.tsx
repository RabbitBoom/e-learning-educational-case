/*
 * @FilePath: \e-learning-educational-case\__tests__\hooks\storesHooks.test.tsx
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-13 18:19:00
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 16:52:25
 */
import { useAppDispatch, useAppSelector } from "@/hooks/storesHooks";
import { rootReducer as reducer } from "@/stores";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

const createTestStore = () =>
  configureStore({
    reducer,
  });

describe("Redux custom hooks", () => {
  it("should dispatch actions using useAppDispatch", () => {
    const store = createTestStore();
    const spy = jest.spyOn(store, "dispatch"); // 先 spy

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAppDispatch(), { wrapper });

    const action = { type: "test/action" };
    result.current(action);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it("should select state using useAppSelector", () => {
    const store = createTestStore();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAppSelector((state) => state.system),
      { wrapper }
    );

    expect(result.current).toBe(store.getState().system);
  });
});
