/*
 * @FilePath: \e-learning-educational-case\src\stores\Storage.ts
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 16:19:21
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-18 16:50:03
 */
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
export default storage;
