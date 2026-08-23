import { create } from "zustand";
import type { TaskDateType } from "../../../../types/task-date-type";

interface UseSelectTaskDateEdit {
  taskDateSelectEdit: null | TaskDateType;
  handleSelectTaskDateEdit: (param: TaskDateType | null) => void;
}

const useSelectTaskDateEdit = create<UseSelectTaskDateEdit>((set) => ({
  taskDateSelectEdit: null,

  handleSelectTaskDateEdit: (taskDate) => {
    set({ taskDateSelectEdit: taskDate });
  },
}));

export default useSelectTaskDateEdit;
