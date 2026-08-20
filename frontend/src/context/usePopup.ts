import { create } from "zustand";

interface UsePopup {
  isOpenPopup: string | null;
  isAnimation: string;
  openPopup: (param: string | null) => void;
  closePopup: () => void;
}

const usePopup = create<UsePopup>((set) => ({
  isOpenPopup: null,
  isAnimation: "close",

  openPopup: (value) => {
    document.body.style.overflow = "hidden";
    set({ isAnimation: "open", isOpenPopup: value });
  },

  closePopup: () => {
    document.body.style.overflow = "unset";
    set({ isAnimation: "close" });
    setTimeout(() => {
      set({ isOpenPopup: null });
    }, 200);
  },
}));

export default usePopup;
