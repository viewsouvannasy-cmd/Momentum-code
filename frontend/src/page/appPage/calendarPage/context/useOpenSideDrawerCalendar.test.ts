// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useSideDrawerCalendar from "./useOpenSideDrawerCalendar";

describe("useSideDrawerCalendar Zustand Store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useSideDrawerCalendar.setState({
      isOpenSideDrawer: false,
      isAnimationSideDrawer: "close",
    });
    document.body.style.overflow = "unset";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has correct initial state", () => {
    const state = useSideDrawerCalendar.getState();
    expect(state.isOpenSideDrawer).toBe(false);
    expect(state.isAnimationSideDrawer).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
  });

  it("openSideDrawer sets animation to open, isOpenSideDrawer to true, and body overflow to hidden", () => {
    useSideDrawerCalendar.getState().openSideDrawer();

    const state = useSideDrawerCalendar.getState();
    expect(state.isOpenSideDrawer).toBe(true);
    expect(state.isAnimationSideDrawer).toBe("open");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closeSideDrawer sets animation to close, resets body overflow, and delays setting isOpenSideDrawer to false by 200ms", () => {
    // Open drawer first
    useSideDrawerCalendar.getState().openSideDrawer();
    expect(useSideDrawerCalendar.getState().isOpenSideDrawer).toBe(true);

    // Call closeSideDrawer
    useSideDrawerCalendar.getState().closeSideDrawer();

    // Immediately after call: animation is 'close', overflow is 'unset', but isOpenSideDrawer is still true
    let state = useSideDrawerCalendar.getState();
    expect(state.isAnimationSideDrawer).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
    expect(state.isOpenSideDrawer).toBe(true);

    // Advance timer by 199ms: still true
    vi.advanceTimersByTime(199);
    expect(useSideDrawerCalendar.getState().isOpenSideDrawer).toBe(true);

    // Advance timer to 200ms: isOpenSideDrawer becomes false
    vi.advanceTimersByTime(1);
    expect(useSideDrawerCalendar.getState().isOpenSideDrawer).toBe(false);
  });
});
