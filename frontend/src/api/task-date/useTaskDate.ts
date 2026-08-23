import { create } from "zustand";
import {
  getFilterMonthYear,
  addDate,
  moveStatusTaskDate,
  deleteTaskDate,
  deleteAllTaskDate,
  deleteRemainderStatus,
  getFilterByDate,
  editTimeTaskDate,
} from "./task-date-helper";

import type { TaskDateType } from "../../types/task-date-type";

interface DateType {
  date: string;
  start_time: string;
  end_time: string;
}

interface UseTaskDate {
  taskDateData: TaskDateType[];
  taskDataFilterDate: TaskDateType[];
  isLoadingTaskDate: boolean;
  isLoadingPost: boolean;
  error: unknown;
  getFilterMonthYear: (month: string, year: string) => void;
  getFilterByDate: (date: string) => void;
  addDate: (group_id: number, task_id: number, arrDate: DateType[]) => void;
  moveStatusTaskDate: (
    group_id: number,
    task_id: number,
    date_id: number,
    toStatus: string,
  ) => void;
  deleteTaskDate: (group_id: number, task_id: number, date_id: number) => void;
  deleteAllTaskDate: (group_id: number, task_id: number) => void;
  deleteRemainderStatus: (
    group_id: number,
    task_id: number,
    status: string,
  ) => void;
  editTimeTaskDate: (
    group_id: number,
    task_id: number,
    date_id: number,
    start_time: string,
    end_time: string,
  ) => void;
}

const useTaskDate = create<UseTaskDate>((set) => ({
  taskDateData: [],
  taskDataFilterDate: [],
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

  // get Task data by filter date
  getFilterByDate: async (date: string) => {
    try {
      const response = await getFilterByDate(date);
      set({ isLoadingTaskDate: false, taskDataFilterDate: response.results });
    } catch (error) {
      set({ isLoadingTaskDate: false, error: error });
    }
  },

  // add task date
  addDate: async (group_id, task_id, arrDate) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await addDate(group_id, task_id, arrDate);
      const response = await getFilterMonthYear(month, year);
      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // this use to move status task date
  moveStatusTaskDate: async (group_id, task_id, date_id, toStatus) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await moveStatusTaskDate(group_id, task_id, date_id, toStatus);
      const response = await getFilterMonthYear(month, year);
      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // delete task date
  deleteTaskDate: async (group_id, task_id, date_id) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await deleteTaskDate(group_id, task_id, date_id);
      const response = await getFilterMonthYear(month, year);

      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // delete all date of that task when user move it back to todo state
  // or when user delete it
  deleteAllTaskDate: async (group_id, task_id) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await deleteAllTaskDate(group_id, task_id);
      const response = await getFilterMonthYear(month, year);
      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  deleteRemainderStatus: async (group_id, task_id, status) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await deleteRemainderStatus(group_id, task_id, status);
      const response = await getFilterMonthYear(month, year);
      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  editTimeTaskDate: async (
    group_id,
    task_id,
    date_id,
    start_time,
    end_time,
  ) => {
    try {
      const year = String(new Date().getFullYear());
      const month = String(new Date().getMonth() + 1);

      set({ isLoadingPost: true });
      await editTimeTaskDate(group_id, task_id, date_id, start_time, end_time);
      const response = await getFilterMonthYear(month, year);
      set({ taskDateData: response.results, isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useTaskDate;
