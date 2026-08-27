import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  checkDateLowThenUserDate,
  findTodayDate,
  createCellId,
  getClassNameCellCalendar,
  checkIsPastDate,
} from "./checkDate";

describe("checkDate utils", () => {
  const mockSystemDate = new Date("2026-08-27T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockSystemDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("checkDateLowThenUserDate", () => {
    it("returns undefined if created_at is not provided", () => {
      expect(checkDateLowThenUserDate(1000000, undefined)).toBeUndefined();
    });

    it("returns true if dateUnix is greater than or equal to user created_at date", () => {
      const created_at = "2026-08-01T00:00:00Z";
      const userDateUnix = new Date(created_at).getTime();
      const targetUnix = userDateUnix + 1000;

      expect(checkDateLowThenUserDate(targetUnix, created_at)).toBe(true);
      expect(checkDateLowThenUserDate(userDateUnix, created_at)).toBe(true);
    });

    it("returns false if dateUnix is lower than user created_at date", () => {
      const created_at = "2026-08-01T00:00:00Z";
      const userDateUnix = new Date(created_at).getTime();
      const targetUnix = userDateUnix - 1000;

      expect(checkDateLowThenUserDate(targetUnix, created_at)).toBe(false);
    });
  });

  describe("findTodayDate", () => {
    it("returns true when cellId matches today's date", () => {
      expect(findTodayDate("2026-08-27")).toBe(true);
    });

    it("returns false when cellId does not match today's date", () => {
      expect(findTodayDate("2026-08-28")).toBe(false);
      expect(findTodayDate("2026-08-26")).toBe(false);
    });
  });

  describe("createCellId", () => {
    it("formats Date object and index into YYYY-MM-index string with padded month", () => {
      const date = new Date(2026, 3, 1); // Month 3 is April (0-indexed)
      expect(createCellId(date, 29)).toBe("2026-04-29");
    });

    it("handles single-digit indices correctly", () => {
      const date = new Date(2026, 0, 15); // Month 0 is January
      expect(createCellId(date, 5)).toBe("2026-01-5");
    });
  });

  describe("getClassNameCellCalendar", () => {
    const selectedDates = [
      {
        date: "2026-08-28",
        start_time: "09:00",
        end_time: "10:00",
        isEdit: false,
      },
    ];

    it("returns 'cell-mini-calendar-selected' when date is in select array", () => {
      expect(getClassNameCellCalendar("2026-08-28", selectedDates)).toBe(
        "cell-mini-calendar-selected"
      );
    });

    it("returns 'cell-mini-calendar' when date is not selected and is today or future date", () => {
      expect(getClassNameCellCalendar("2026-08-27", [])).toBe(
        "cell-mini-calendar"
      );
      expect(getClassNameCellCalendar("2026-08-30", [])).toBe(
        "cell-mini-calendar"
      );
    });

    it("returns 'cell-mini-calendar-past' when date is in the past and not selected", () => {
      expect(getClassNameCellCalendar("2026-08-25", [])).toBe(
        "cell-mini-calendar-past"
      );
    });
  });

  describe("checkIsPastDate", () => {
    it("returns true for a past date", () => {
      expect(checkIsPastDate("2026-08-26")).toBe(true);
    });

    it("returns false for today's date", () => {
      expect(checkIsPastDate("2026-08-27")).toBe(false);
    });

    it("returns false for a future date", () => {
      expect(checkIsPastDate("2026-08-28")).toBe(false);
    });
  });
});
