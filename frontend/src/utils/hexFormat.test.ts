import { describe, it, expect } from "vitest";
import { rgbStringToHex } from "./hexFormat";

describe("rgbStringToHex", () => {
  it("returns undefined when input is undefined", () => {
    expect(rgbStringToHex(undefined)).toBeUndefined();
  });

  it("returns undefined when input is an empty string", () => {
    expect(rgbStringToHex("")).toBeUndefined();
  });

  it("converts a standard rgb string to hex", () => {
    expect(rgbStringToHex("rgb(255, 0, 0)")).toBe("#ff0000");
  });

  it("converts an rgba string and ignores the opacity value", () => {
    expect(rgbStringToHex("rgba(255, 0, 0, 0.7)")).toBe("#ff0000");
  });

  it("converts black correctly", () => {
    expect(rgbStringToHex("rgb(0, 0, 0)")).toBe("#000000");
  });

  it("converts white correctly", () => {
    expect(rgbStringToHex("rgb(255, 255, 255)")).toBe("#ffffff");
  });

  it("handles rgb string without spaces", () => {
    expect(rgbStringToHex("rgb(10,20,30)")).toBe("#0a141e");
  });

  it("handles decimal opacity without affecting r/g/b parsing", () => {
    expect(rgbStringToHex("rgba(100, 150, 200, 0.55)")).toBe("#6496c8");
  });
});
