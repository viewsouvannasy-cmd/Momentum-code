import { getData } from "./getData-helper.ts";
import { create } from "zustand";

interface DateType {
  date_id: number;
  task_date: string;
  start_time: string;
  end_time: string;
}

interface TaskType {
  task_id: number;
  task_name: string;
  task_status: string;
  date: DateType[] | [];
}

interface TodoType {
  group_id: number;
  group_name: string;
  group_color: string;
  tasks: TaskType[] | [];
}

interface UseGetDateType {
  todoData: TodoType[] | [];
  isLoading: boolean;
  error: unknown;
  getDataTodo: () => void;
}

const useGetData = create<UseGetDateType>((set) => ({
  todoData: [],
  isLoading: true,
  error: null,

  //  use to get to do data
  getDataTodo: async () => {
    try {
      const results = await getData();
      set({ todoData: results.results, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false, error: error });
    }
  },
}));

export default useGetData;
