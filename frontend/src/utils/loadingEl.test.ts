import { it, describe, expect } from "vitest";
import { getLoadingStateEl } from "./loadingEl";

describe("getLoadingStateEl", () => {
  it("return 2 if state equal to todo", () => {
    expect(getLoadingStateEl("todo")).toBe(2);
  });

  it("return 3 if state equal to doing", () => {
    expect(getLoadingStateEl("doing")).toBe(3);
  });

  it("return 1 if state equal to done", () => {
    expect(getLoadingStateEl("done")).toBe(1);
  });
});
