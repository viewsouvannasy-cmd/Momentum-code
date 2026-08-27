// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DisplayItemToDo } from "./DisplayItemToDo";
import type { TaskType } from "../../../../../../types/task-type";

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock api hooks
const mockMoveTo = vi.fn().mockResolvedValue(undefined);
const mockDeleteTask = vi.fn().mockResolvedValue(undefined);
const mockDeleteAllTaskDate = vi.fn().mockResolvedValue(undefined);
const mockDeleteRemainderStatus = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../../../../api/task/useTask", () => ({
  default: () => ({
    moveTo: mockMoveTo,
    deleteTask: mockDeleteTask,
  }),
}));

vi.mock("../../../../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    deleteAllTaskDate: mockDeleteAllTaskDate,
    deleteRemainderStatus: mockDeleteRemainderStatus,
  }),
}));

// Mock context hooks
const mockOpenSideDrawer = vi.fn();
const mockSelectTask = vi.fn();

vi.mock("../../../../calendarPage/context/useOpenSideDrawerCalendar", () => ({
  default: () => ({
    openSideDrawer: mockOpenSideDrawer,
  }),
}));

vi.mock("../../../../calendarPage/context/useSelectTask", () => ({
  default: () => ({
    selectTask: mockSelectTask,
  }),
}));

describe("DisplayItemToDo Component", () => {
  const baseTask: TaskType = {
    group_id: 1,
    group_name: "Personal",
    group_color: "rgb(0, 128, 255)",
    task_id: 10,
    task_name: "Buy groceries",
    task_status: "todo",
  };

  beforeEach(() => {
    mockNavigate.mockReset();
    mockMoveTo.mockReset().mockResolvedValue(undefined);
    mockDeleteTask.mockReset().mockResolvedValue(undefined);
    mockDeleteAllTaskDate.mockReset().mockResolvedValue(undefined);
    mockDeleteRemainderStatus.mockReset().mockResolvedValue(undefined);
    mockOpenSideDrawer.mockReset();
    mockSelectTask.mockReset();
  });

  it("renders task info and 'TO DO' badge for todo tasks", () => {
    render(<DisplayItemToDo task={baseTask} />);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.getByText("Personal")).toBeInTheDocument();
    expect(screen.getByText("TO DO")).toBeInTheDocument();
  });

  it("handles 'do' button click on todo task: navigates, opens drawer, and selects task", () => {
    render(<DisplayItemToDo task={baseTask} />);

    const doBtn = screen.getByRole("button", { name: /^do$/i });
    fireEvent.click(doBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/app/calendar");
    expect(mockOpenSideDrawer).toHaveBeenCalledTimes(1);
    expect(mockSelectTask).toHaveBeenCalledWith(baseTask);
  });

  it("renders 'DOING' badge and 'submit' button for doing tasks", () => {
    const doingTask: TaskType = { ...baseTask, task_status: "doing" };
    render(<DisplayItemToDo task={doingTask} />);

    expect(screen.getByText("DOING")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^submit$/i }),
    ).toBeInTheDocument();
  });

  it("handles 'submit' button click on doing task", async () => {
    const doingTask: TaskType = { ...baseTask, task_status: "doing" };
    render(<DisplayItemToDo task={doingTask} />);

    const submitBtn = screen.getByRole("button", { name: /^submit$/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockDeleteRemainderStatus).toHaveBeenCalledWith(1, 10, "wait");
      expect(mockMoveTo).toHaveBeenCalledWith(1, 10, "done");
    });
  });

  it("renders 'DONE' badge and 'Completed' message for done tasks", () => {
    const doneTask: TaskType = { ...baseTask, task_status: "done" };
    render(<DisplayItemToDo task={doneTask} />);

    expect(screen.getByText("DONE")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^do$/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^submit$/i }),
    ).not.toBeInTheDocument();
  });

  it("toggles option container display on focus and blur", () => {
    const { container } = render(<DisplayItemToDo task={baseTask} />);
    const optionBtn = container.querySelector(
      ".btn-open-option-task-item",
    ) as HTMLButtonElement;
    const optionContainer = container.querySelector(
      ".container-option-task-item",
    ) as HTMLElement;

    expect(optionContainer.style.display).toBe("none");

    fireEvent.focus(optionBtn);
    expect(optionContainer.style.display).toBe("initial");

    fireEvent.blur(optionBtn);
    expect(optionContainer.style.display).toBe("none");
  });

  it("handles 'Move back to To Do' click on doing task", async () => {
    const doingTask: TaskType = { ...baseTask, task_status: "doing" };
    const { container } = render(<DisplayItemToDo task={doingTask} />);

    const moveBackBtn = container.querySelector(
      ".move-back-btn",
    ) as HTMLButtonElement;
    expect(moveBackBtn).toBeInTheDocument();

    fireEvent.click(moveBackBtn);

    await waitFor(() => {
      expect(mockDeleteAllTaskDate).toHaveBeenCalledWith(1, 10);
      expect(mockMoveTo).toHaveBeenCalledWith(1, 10, "todo");
    });
  });

  it("handles 'Redo Task' click on done task", () => {
    const doneTask: TaskType = { ...baseTask, task_status: "done" };
    const { container } = render(<DisplayItemToDo task={doneTask} />);

    const redoBtn = container.querySelector(
      ".reopen-task-btn",
    ) as HTMLButtonElement;
    expect(redoBtn).toBeInTheDocument();

    fireEvent.click(redoBtn);

    expect(mockMoveTo).toHaveBeenCalledWith(1, 10, "doing");
  });

  it("handles 'Delete' click and calls deleteAllTaskDate & deleteTask", async () => {
    const { container } = render(<DisplayItemToDo task={baseTask} />);

    const deleteBtn = container.querySelector(
      ".delete-task-btn",
    ) as HTMLButtonElement;
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockDeleteAllTaskDate).toHaveBeenCalledWith(1, 10);
      expect(mockDeleteTask).toHaveBeenCalledWith(1, 10);
    });
  });
});
