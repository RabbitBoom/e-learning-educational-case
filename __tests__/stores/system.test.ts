/*
 * @FilePath: \e-learning-educational-case\__tests__\stores\system.test.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-17 17:42:50
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-17 17:47:41
 */
import reducer, { setTheme } from "@/stores/system";

describe("system reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      theme: "light",
    });
  });
  it("should handle setTheme", () => {
    const actual = reducer({ theme: "light" }, setTheme("dark"));
    expect(actual.theme).toEqual("dark");
  });
});
