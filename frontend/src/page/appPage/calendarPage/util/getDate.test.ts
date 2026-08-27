import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getToday } from "./getDate";

describe("getDate utils", () => {
  const mockSystemDate = new Date("2026-08-27T15:30:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockSystemDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getToday", () => {
    it("returns current date formatted as YYYY-MM-DD", () => {
      expect(getToday()).toBe("2026-08-27");
    });
  });
});
