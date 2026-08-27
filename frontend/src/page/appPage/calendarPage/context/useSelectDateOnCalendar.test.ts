import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useSelectDateCell from "./useSelectDateOnCalendar";

describe("useSelectDateCell Zustand Store", () => {
  const mockSystemDate = new Date("2026-08-27T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockSystemDate);
    useSelectDateCell.setState({
      cellSelected: "2026-08-27",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has initial state set to today's date format", () => {
    const state = useSelectDateCell.getState();
    expect(state.cellSelected).toBe("2026-08-27");
  });

  it("updates cellSelected when selectDateCell is called", () => {
    useSelectDateCell.getState().selectDateCell("2026-09-01");

    expect(useSelectDateCell.getState().cellSelected).toBe("2026-09-01");
  });
});
