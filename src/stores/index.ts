/*
 * @FilePath: \e-learning-educational-case\src\stores\index.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-12 23:37:18
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-16 10:31:12
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { systemSlice } from "./system";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["system"], // only system will be persisted
};

const rootReducer = combineReducers({
  system: systemSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
