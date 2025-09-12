/*
 * @FilePath: \e-learning-educational-case\src\hooks\storesHooks.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-12 16:28:36
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-12 16:32:30
 */
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
