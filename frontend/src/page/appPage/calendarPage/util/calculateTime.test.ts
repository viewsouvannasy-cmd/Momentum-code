import { describe, it, expect } from "vitest";
import {
  calculateSpendingTime,
  sortDateArray,
  getTimeUnix,
  setTimeAllDate,
  sortByTime,
  type SelectDateType,
} from "./calculateTime";
import type { TaskDateType } from "../../../../types/task-date-type";

describe("calculateTime utils", () => {
  describe("calculateSpendingTime", () => {
    it("returns minutes only when hours difference is 0", () => {
      expect(calculateSpendingTime("10:00", "10:45")).toBe("45 m");
    });

    it("returns hours only when minutes difference is 0", () => {
      expect(calculateSpendingTime("09:00", "12:00")).toBe("3 h");
    });

    it("returns hours and minutes when both are non-zero", () => {
      expect(calculateSpendingTime("09:15", "11:45")).toBe("2 h 30 m");
    });

    it("returns '0 m' when start time equals end time", () => {
      expect(calculateSpendingTime("10:00", "10:00")).toBe("0 m");
    });

    it("handles overnight duration (end time earlier than start time)", () => {
      expect(calculateSpendingTime("23:00", "01:30")).toBe("2 h 30 m");
      expect(calculateSpendingTime("22:00", "02:00")).toBe("4 h");
    });
  });

  describe("getTimeUnix", () => {
    it("returns correct timestamp in milliseconds for valid date string", () => {
      const dateStr = "2026-08-27";
      expect(getTimeUnix(dateStr)).toBe(new Date(dateStr).getTime());
    });
  });

  describe("sortDateArray", () => {
    it("sorts array of dates in ascending order", () => {
      const input: SelectDateType[] = [
        { date: "2026-08-30", start_time: "09:00", end_time: "10:00", isEdit: false },
        { date: "2026-08-10", start_time: "09:00", end_time: "10:00", isEdit: false },
        { date: "2026-08-20", start_time: "09:00", end_time: "10:00", isEdit: false },
      ];

      const sorted = sortDateArray(input);

      expect(sorted.map((item) => item.date)).toEqual([
        "2026-08-10",
        "2026-08-20",
        "2026-08-30",
      ]);
    });

    it("does not mutate the original array", () => {
      const input: SelectDateType[] = [
        { date: "2026-08-30", start_time: "09:00", end_time: "10:00", isEdit: false },
        { date: "2026-08-10", start_time: "09:00", end_time: "10:00", isEdit: false },
      ];

      const sorted = sortDateArray(input);
      expect(sorted).not.toBe(input);
      expect(input[0].date).toBe("2026-08-30");
    });
  });

  describe("setTimeAllDate", () => {
    it("updates start_time and end_time for items where isEdit is false", () => {
      const input: SelectDateType[] = [
        { date: "2026-08-27", start_time: "08:00", end_time: "09:00", isEdit: false },
        { date: "2026-08-28", start_time: "10:00", end_time: "11:00", isEdit: true },
      ];

      const result = setTimeAllDate(input, "12:00", "13:00");

      expect(result).toEqual([
        { date: "2026-08-27", start_time: "12:00", end_time: "13:00", isEdit: false },
        { date: "2026-08-28", start_time: "10:00", end_time: "11:00", isEdit: true },
      ]);
    });
  });

  describe("sortByTime", () => {
    it("sorts task objects by start_time in ascending order", () => {
      const tasks: TaskDateType[] = [
        {
          group_id: 1,
          group_name: "Work",
          group_color: "#ff0000",
          task_id: 1,
          task_name: "Task 1",
          task_status: "pending",
          date_id: 1,
          task_date: "2026-08-27",
          start_time: "14:30",
          end_time: "15:30",
          date_status: "wait",
        },
        {
          group_id: 1,
          group_name: "Work",
          group_color: "#ff0000",
          task_id: 2,
          task_name: "Task 2",
          task_status: "pending",
          date_id: 2,
          task_date: "2026-08-27",
          start_time: "08:15",
          end_time: "09:15",
          date_status: "wait",
        },
        {
          group_id: 1,
          group_name: "Work",
          group_color: "#ff0000",
          task_id: 3,
          task_name: "Task 3",
          task_status: "pending",
          date_id: 3,
          task_date: "2026-08-27",
          start_time: "09:00",
          end_time: "10:00",
          date_status: "wait",
        },
      ];

      const sorted = sortByTime(tasks);

      expect(sorted.map((t) => t.start_time)).toEqual([
        "08:15",
        "09:00",
        "14:30",
      ]);
    });

    it("does not mutate the original array", () => {
      const tasks: TaskDateType[] = [
        {
          group_id: 1,
          group_name: "Work",
          group_color: "#ff0000",
          task_id: 1,
          task_name: "Task 1",
          task_status: "pending",
          date_id: 1,
          task_date: "2026-08-27",
          start_time: "14:30",
          end_time: "15:30",
          date_status: "wait",
        },
        {
          group_id: 1,
          group_name: "Work",
          group_color: "#ff0000",
          task_id: 2,
          task_name: "Task 2",
          task_status: "pending",
          date_id: 2,
          task_date: "2026-08-27",
          start_time: "08:15",
          end_time: "09:15",
          date_status: "wait",
        },
      ];

      const sorted = sortByTime(tasks);
      expect(sorted).not.toBe(tasks);
      expect(tasks[0].start_time).toBe("14:30");
    });
  });
});
