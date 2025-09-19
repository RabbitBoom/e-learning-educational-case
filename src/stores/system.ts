/*
 * @FilePath: \e-learning-educational-case\src\stores\system.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-17 16:31:11
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-18 23:06:38
 */
import { createSlice } from "@reduxjs/toolkit";

type SystemState = {
  theme: "light" | "dark";
};

const initialState: SystemState = {
  theme: "light",
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = systemSlice.actions;

export default systemSlice.reducer;
