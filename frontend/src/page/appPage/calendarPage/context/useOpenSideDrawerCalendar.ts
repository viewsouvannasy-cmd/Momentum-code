import { create } from "zustand";

interface UseSideDrawerCalendarType {
  isOpenSideDrawer: boolean;
  isAnimationSideDrawer: "close" | "open";
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
}

const useSideDrawerCalendar = create<UseSideDrawerCalendarType>((set) => ({
  isOpenSideDrawer: false,
  isAnimationSideDrawer: "close",

  openSideDrawer: () => {
    document.body.style.overflow = "hidden";
    set({
      isAnimationSideDrawer: "open",
      isOpenSideDrawer: true,
    });
  },

  closeSideDrawer: () => {
    document.body.style.overflow = "unset";
    set({ isAnimationSideDrawer: "close" });
    setTimeout(() => {
      set({ isOpenSideDrawer: false });
    }, 200);
  },
}));

export default useSideDrawerCalendar;
