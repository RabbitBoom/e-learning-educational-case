import { createSlice } from "@reduxjs/toolkit";

type SystemState = {
  theme: "light" | "dark" | "system";
};

const initialState: SystemState = {
  theme: "light",
};
export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});
