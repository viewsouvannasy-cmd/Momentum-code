import { it, describe, expect } from "vitest";
import { rbgaFormot, reduceRgbaOpacity } from "./rgbaFormart";

describe("rgbaFormot", () => {
  it("returns undefined when input is undefined", () => {
    expect(rbgaFormot(undefined)).toBeUndefined();
  });
  it("converts a standard hex color to rgba string", () => {
    expect(rbgaFormot("#ff0000")).toBe("rgba(255, 0, 0, 0.7)");
  });

  it("converts black correctly", () => {
    expect(rbgaFormot("#000000")).toBe("rgba(0, 0, 0, 0.7)");
  });

  it("converts white correctly", () => {
    expect(rbgaFormot("#ffffff")).toBe("rgba(255, 255, 255, 0.7)");
  });

  it("handles lowercase hex letters", () => {
    expect(rbgaFormot("#aabbcc")).toBe("rgba(170, 187, 204, 0.7)");
  });

  it("handles uppercase hex letters", () => {
    expect(rbgaFormot("#AABBCC")).toBe("rgba(170, 187, 204, 0.7)");
  });
});

describe("reduceRgbaOpacity", () => {
  it("replaces the opacity value in a standard rgba string", () => {
    expect(reduceRgbaOpacity("rgba(255, 0, 0, 0.7)", "0.3")).toBe(
      "rgba(255, 0, 0, 0.3)",
    );
  });

  it("preserves spacing style of the original string", () => {
    expect(reduceRgbaOpacity("rgba(255, 0, 0, 0.7)", "0.5")).toBe(
      "rgba(255, 0, 0, 0.5)",
    );
  });

  it("works with opacity 1", () => {
    expect(reduceRgbaOpacity("rgba(0, 0, 0, 0.7)", "1")).toBe(
      "rgba(0, 0, 0, 1)",
    );
  });

  it("works with opacity 0", () => {
    expect(reduceRgbaOpacity("rgba(255, 255, 255, 0.7)", "0")).toBe(
      "rgba(255, 255, 255, 0)",
    );
  });

  it("works when there is no space before the opacity value", () => {
    expect(reduceRgbaOpacity("rgba(255,0,0,0.7)", "0.4")).toBe(
      "rgba(255,0,0,0.4)",
    );
  });

  it("handles multi-digit opacity replacement value", () => {
    expect(reduceRgbaOpacity("rgba(10, 20, 30, 0.9)", "0.25")).toBe(
      "rgba(10, 20, 30, 0.25)",
    );
  });

  it("returns the string unchanged if it does not match the expected pattern", () => {
    // ไม่มี "number)" ท้าย string เลย เช่น string เปล่า หรือ format แปลก
    expect(reduceRgbaOpacity("not-a-color", "0.5")).toBe("not-a-color");
  });
});
