import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { systemSlice } from "./system";

const reducer = combineReducers({
  system: systemSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
