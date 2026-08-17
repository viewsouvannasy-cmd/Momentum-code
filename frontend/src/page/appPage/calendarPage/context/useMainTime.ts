import { create } from "zustand";

interface UseMainTime {
  start_time_main: string;
  end_time_main: string;
  changeMainTime: (
    value: string,
    whichTime: "start_time_main" | "end_time_main",
  ) => void;
}

const useMainTime = create<UseMainTime>((set) => ({
  start_time_main: "09:00",
  end_time_main: "13:00",

  changeMainTime: (value, whichTime) => {
    if (whichTime === "start_time_main") {
      set({ start_time_main: value });
      return;
    }

    if (whichTime === "end_time_main") {
      set({ end_time_main: value });
      return;
    }
  },
}));

export default useMainTime;
