// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useSideBarMb from "./useSideBarMb";

describe("useSideBarMb Zustand Store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useSideBarMb.setState({
      isOpenSideBarMb: "close",
      isBackgroundOverlayMb: "close",
    });
    document.body.style.overflow = "unset";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has correct initial state", () => {
    const state = useSideBarMb.getState();
    expect(state.isOpenSideBarMb).toBe("close");
    expect(state.isBackgroundOverlayMb).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
  });

  it("openSideBarMb sets sidebar & overlay to 'open' and body overflow to 'hidden'", () => {
    useSideBarMb.getState().openSideBarMb();

    const state = useSideBarMb.getState();
    expect(state.isOpenSideBarMb).toBe("open");
    expect(state.isBackgroundOverlayMb).toBe("open");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closeSideBarMb sets sidebar to 'close', resets body overflow, and delays setting overlay to 'close' by 200ms", () => {
    useSideBarMb.getState().openSideBarMb();
    expect(useSideBarMb.getState().isOpenSideBarMb).toBe("open");

    useSideBarMb.getState().closeSideBarMb();

    let state = useSideBarMb.getState();
    expect(state.isOpenSideBarMb).toBe("close");
    expect(document.body.style.overflow).toBe("unset");
    expect(state.isBackgroundOverlayMb).toBe("open");

    // Advance 199ms: overlay is still 'open'
    vi.advanceTimersByTime(199);
    expect(useSideBarMb.getState().isBackgroundOverlayMb).toBe("open");

    // Advance to 200ms: overlay becomes 'close'
    vi.advanceTimersByTime(1);
    expect(useSideBarMb.getState().isBackgroundOverlayMb).toBe("close");
  });
});
