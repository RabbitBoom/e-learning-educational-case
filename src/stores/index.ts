/*
 * @FilePath: \e-learning-educational-case\src\stores\index.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-12 23:37:18
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-20 16:50:33
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import system from "./System";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["system"], // only system will be persisted
};

export const rootReducer = combineReducers({
  system,
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
