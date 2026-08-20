import { create } from "zustand";

interface SeletcTaskType {
  task_id: number;
  task_name: string;
  task_status: string;
  group_id: number;
  group_name: string;
  group_color: string;
}

interface UseSelectTask {
  taskSelected: SeletcTaskType | null;
  selectTask: (task: SeletcTaskType | null) => void;
}

const useSelectTask = create<UseSelectTask>((set) => ({
  taskSelected: null,

  selectTask: (task) => {
    set({ taskSelected: task });
  },
}));

export default useSelectTask;
