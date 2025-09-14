import { store } from "@/stores";

describe("Redux store", () => {
  it("should be defined", () => {
    expect(store).toBeDefined();
  });

  it("should have a getState method", () => {
    expect(typeof store.getState).toBe("function");
  });

  it("should have a dispatch method", () => {
    expect(typeof store.dispatch).toBe("function");
  });

  it("should return system state ", () => {
    const { system } = store.getState();
    expect(system).toEqual({ theme: "light" });
  });

  it("should allow dispatch of unknown action without errors", () => {
    expect(() => store.dispatch({ type: "UNKNOWN_ACTION" })).not.toThrow();
  });
});
