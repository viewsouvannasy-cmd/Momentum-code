import { create } from "zustand";

interface UseSideBarMb {
  isOpenSideBarMb: "close" | "open";
  isBackgroundOverlayMb: "close" | "open";
  openSideBarMb: () => void;
  closeSideBarMb: () => void;
}

const useSideBarMb = create<UseSideBarMb>((set) => ({
  isOpenSideBarMb: "close",
  isBackgroundOverlayMb: "close",

  openSideBarMb: () => {
    document.body.style.overflow = "hidden";
    set({ isOpenSideBarMb: "open", isBackgroundOverlayMb: "open" });
  },

  closeSideBarMb: () => {
    document.body.style.overflow = "unset";
    set({ isOpenSideBarMb: "close" });
    setTimeout(() => {
      set({ isBackgroundOverlayMb: "close" });
    }, 200);
  },
}));

export default useSideBarMb;
