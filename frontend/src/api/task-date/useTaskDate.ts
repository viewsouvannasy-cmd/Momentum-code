import { create } from "zustand";
import {
  getFilterMonthYear,
  addDate,
  deleteTaskDate,
  deleteAllTaskDate,
} from "./task-date-helper";

interface DateType {
  date: string;
  start_time: string;
  end_time: string;
}

export interface TaskDateType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  date_id: number;
  task_date: string;
  start_time: string;
  end_time: string;
  date_status: "wait" | "do" | "miss";
}

interface UseTaskDate {
  taskDateData: TaskDateType[];
  isLoadingTaskDate: boolean;
  isLoadingPost: boolean;
  error: unknown;
  getFilterMonthYear: (month: string, year: string) => void;
  addDate: (group_id: number, task_id: number, arrDate: DateType[]) => void;
  deleteTaskDate: (group_id: number, task_id: number, date_id: number) => void;
  deleteAllTaskDate: (group_id: number, task_id: number) => void;
}

const useTaskDate = create<UseTaskDate>((set) => ({
  taskDateData: [],
  isLoadingTaskDate: true,
  isLoadingPost: false,
  error: null,

  // get task date by filter month and year
  getFilterMonthYear: async (month, year) => {
    try {
      set({ isLoadingTaskDate: true });
      const response = await getFilterMonthYear(month, year);
      set({ isLoadingTaskDate: false, taskDateData: response.results });
    } catch (error) {
      set({ isLoadingTaskDate: false, error: error });
    }
  },

  // add task date
  addDate: async (group_id, task_id, arrDate) => {
    try {
      set({ isLoadingPost: true });
      await addDate(group_id, task_id, arrDate);
      set({ isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // delete task date
  deleteTaskDate: async (group_id, task_id, date_id) => {
    try {
      set({ isLoadingPost: true });
      await deleteTaskDate(group_id, task_id, date_id);
      set({ isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // delete all date of that task when user move it back to todo state
  // or when user delete it
  deleteAllTaskDate: async (group_id, task_id) => {
    try {
      set({ isLoadingPost: true });
      await deleteAllTaskDate(group_id, task_id);
      set({ isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useTaskDate;
