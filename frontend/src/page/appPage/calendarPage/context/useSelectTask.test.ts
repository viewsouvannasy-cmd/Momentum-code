import { describe, it, expect, beforeEach } from "vitest";
import useSelectTask from "./useSelectTask";

describe("useSelectTask Zustand Store", () => {
  const dummyTask = {
    task_id: 1,
    task_name: "Design mockup",
    task_status: "todo",
    group_id: 10,
    group_name: "Design",
    group_color: "#ff00ff",
  };

  beforeEach(() => {
    useSelectTask.setState({
      taskSelected: null,
    });
  });

  it("has initial state taskSelected set to null", () => {
    const state = useSelectTask.getState();
    expect(state.taskSelected).toBeNull();
  });

  it("updates taskSelected when selectTask is called with a task object", () => {
    useSelectTask.getState().selectTask(dummyTask);

    expect(useSelectTask.getState().taskSelected).toEqual(dummyTask);
  });

  it("resets taskSelected to null when selectTask is called with null", () => {
    useSelectTask.getState().selectTask(dummyTask);
    expect(useSelectTask.getState().taskSelected).toEqual(dummyTask);

    useSelectTask.getState().selectTask(null);
    expect(useSelectTask.getState().taskSelected).toBeNull();
  });
});
