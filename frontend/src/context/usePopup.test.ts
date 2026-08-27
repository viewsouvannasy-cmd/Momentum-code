// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import usePopup from "./usePopup";

describe("usePopup Zustand Store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    usePopup.setState({
      isOpenPopup: null,
      isAnimation: "close",
    });
    document.body.style.overflow = "unset";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has correct initial state", () => {
    const state = usePopup.getState();
    expect(state.isOpenPopup).toBeNull();
    expect(state.isAnimation).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
  });

  it("openPopup updates isOpenPopup, isAnimation to 'open', and body overflow to 'hidden'", () => {
    usePopup.getState().openPopup("change-time");

    const state = usePopup.getState();
    expect(state.isOpenPopup).toBe("change-time");
    expect(state.isAnimation).toBe("open");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closePopup sets isAnimation to 'close', resets body overflow, and delays clearing isOpenPopup by 200ms", () => {
    usePopup.getState().openPopup("change-time");
    expect(usePopup.getState().isOpenPopup).toBe("change-time");

    usePopup.getState().closePopup();

    let state = usePopup.getState();
    expect(state.isAnimation).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
    expect(state.isOpenPopup).toBe("change-time");

    // Advance 199ms: isOpenPopup is still 'change-time'
    vi.advanceTimersByTime(199);
    expect(usePopup.getState().isOpenPopup).toBe("change-time");

    // Advance to 200ms: isOpenPopup becomes null
    vi.advanceTimersByTime(1);
    expect(usePopup.getState().isOpenPopup).toBeNull();
  });
});
