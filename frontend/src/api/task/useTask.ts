import { create } from "zustand";
import {
  getTaskData,
  addNewTask,
  moveToState,
  deleteTask,
} from "./task-helper.ts";

interface TaskType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
}

interface UseTask {
  taskData: TaskType[] | [];
  isLoadingTask: boolean;
  isLoadingPost: boolean;
  error: unknown;

  getTask: () => void;
  addTask: (group_id: string, task_name: string) => void;
  moveTo: (group_id: string, task_id: string, toState: string) => void;
  deleteTask: (group_id: string, task_id: string) => void;
}

const useTask = create<UseTask>((set) => ({
  taskData: [],
  isLoadingTask: true,
  isLoadingPost: false,
  error: null,

  getTask: async () => {
    try {
      const response = await getTaskData();
      set({ isLoadingTask: false, taskData: response.results });
    } catch (error) {
      set({ isLoadingTask: false, error: error });
    }
  },

  addTask: async (group_id, task_name) => {
    try {
      set({ isLoadingPost: true });
      await addNewTask(group_id, task_name);
      const response = await getTaskData();
      set({ isLoadingPost: false, taskData: response.results });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  moveTo: async (group_id, task_id, toState) => {
    try {
      set({ isLoadingPost: true });

      await moveToState(group_id, task_id, toState);
      const response = await getTaskData();
      set({ isLoadingPost: false, taskData: response.results });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  deleteTask: async (group_id, task_id) => {
    try {
      set({ isLoadingPost: true });
      await deleteTask(group_id, task_id);
      const response = await getTaskData();
      set({ isLoadingPost: false, taskData: response.results });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useTask;
