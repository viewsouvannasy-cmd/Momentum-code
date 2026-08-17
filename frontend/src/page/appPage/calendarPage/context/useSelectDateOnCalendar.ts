import { create } from "zustand";
import dayjs from "dayjs";

interface UseSelectDateOnCalendar {
  cellSelected: string;
  selectDateCell: (date: string) => void;
}

const useSelectDateCell = create<UseSelectDateOnCalendar>((set) => ({
  cellSelected: dayjs(new Date()).format("YYYY-MM-D"),

  selectDateCell: (date) => {
    set({ cellSelected: date });
  },
}));

export default useSelectDateCell;
