/**
 * @jest-environment node
 */

// mock 浏览器分支的 createWebStorage
jest.mock("redux-persist/lib/storage/createWebStorage", () => {
  return jest.fn((type) => ({
    getItem: jest.fn(() => Promise.resolve("mocked")),
    setItem: jest.fn((key, value) => Promise.resolve(value)),
    removeItem: jest.fn(() => Promise.resolve()),
  }));
});

describe("storage module", () => {
  describe("Node environment (createNoopStorage)", () => {
    it("should return correct values for createNoopStorage methods", async () => {
      await jest.isolateModulesAsync(async () => {
        // @ts-expect-error: Simulate SSR by making window undefined
        delete global.window;

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const nodeStorage = require("@/stores/Storage").default;

        const getValue = await nodeStorage.getItem("testKey");
        expect(getValue).toBeNull();

        const setValue = await nodeStorage.setItem("testKey", "testValue");
        expect(setValue).toBe("testValue");

        const removeValue = await nodeStorage.removeItem("testKey");
        expect(removeValue).toBeUndefined();
      });
    });
  });

  describe("Browser environment (createWebStorage)", () => {
    beforeAll(() => {
      // @ts-expect-error: Simulate SSR by making window undefined
      global.window = {};
    });

    afterAll(() => {
      // @ts-expect-error: Simulate SSR by making window undefined
      delete global.window;
    });

    it("should use createWebStorage when window is defined", async () => {
      await jest.isolateModulesAsync(async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const browserStorage = require("@/stores/Storage").default;

        const getValue = await browserStorage.getItem("key");
        expect(getValue).toBe("mocked");

        const setValue = await browserStorage.setItem("key", "value");
        expect(setValue).toBe("value");

        const removeValue = await browserStorage.removeItem("key");
        expect(removeValue).toBeUndefined();
      });
    });
  });
});
