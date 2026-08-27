import { describe, it, expect, beforeEach } from "vitest";
import useMainTime from "./useMainTime";

describe("useMainTime Zustand Store", () => {
  beforeEach(() => {
    useMainTime.setState({
      start_time_main: "09:00",
      end_time_main: "13:00",
    });
  });

  it("has correct initial default state", () => {
    const state = useMainTime.getState();
    expect(state.start_time_main).toBe("09:00");
    expect(state.end_time_main).toBe("13:00");
  });

  it("updates start_time_main when changeMainTime is called with 'start_time_main'", () => {
    useMainTime.getState().changeMainTime("10:30", "start_time_main");

    expect(useMainTime.getState().start_time_main).toBe("10:30");
    expect(useMainTime.getState().end_time_main).toBe("13:00");
  });

  it("updates end_time_main when changeMainTime is called with 'end_time_main'", () => {
    useMainTime.getState().changeMainTime("16:45", "end_time_main");

    expect(useMainTime.getState().end_time_main).toBe("16:45");
    expect(useMainTime.getState().start_time_main).toBe("09:00");
  });

  it("updates both start and end main times independently", () => {
    const { changeMainTime } = useMainTime.getState();

    changeMainTime("08:00", "start_time_main");
    changeMainTime("12:00", "end_time_main");

    expect(useMainTime.getState().start_time_main).toBe("08:00");
    expect(useMainTime.getState().end_time_main).toBe("12:00");
  });
});
