import { describe, it, expect, beforeEach } from "vitest";
import useSelectTaskDateEdit from "./useSelectTaskDateEdit";
import type { TaskDateType } from "../../../../types/task-date-type";

describe("useSelectTaskDateEdit Zustand Store", () => {
  const mockTaskDate: TaskDateType = {
    group_id: 1,
    group_name: "Work",
    group_color: "#ff0000",
    task_id: 101,
    task_name: "Feature Implementation",
    task_status: "doing",
    date_id: 20,
    task_date: "2026-08-27",
    start_time: "09:00:00",
    end_time: "11:00:00",
    date_status: "today",
  };

  beforeEach(() => {
    useSelectTaskDateEdit.setState({
      taskDateSelectEdit: null,
    });
  });

  it("has initial state taskDateSelectEdit set to null", () => {
    const state = useSelectTaskDateEdit.getState();
    expect(state.taskDateSelectEdit).toBeNull();
  });

  it("updates taskDateSelectEdit when handleSelectTaskDateEdit is called with a TaskDateType item", () => {
    useSelectTaskDateEdit.getState().handleSelectTaskDateEdit(mockTaskDate);

    expect(useSelectTaskDateEdit.getState().taskDateSelectEdit).toEqual(
      mockTaskDate
    );
  });

  it("resets taskDateSelectEdit to null when handleSelectTaskDateEdit is called with null", () => {
    useSelectTaskDateEdit.getState().handleSelectTaskDateEdit(mockTaskDate);
    expect(useSelectTaskDateEdit.getState().taskDateSelectEdit).toEqual(
      mockTaskDate
    );

    useSelectTaskDateEdit.getState().handleSelectTaskDateEdit(null);
    expect(useSelectTaskDateEdit.getState().taskDateSelectEdit).toBeNull();
  });
});
