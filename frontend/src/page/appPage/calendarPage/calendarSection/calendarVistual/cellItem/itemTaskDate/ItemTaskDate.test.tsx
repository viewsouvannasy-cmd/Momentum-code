// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ItemTaskDate } from "./ItemTaskDate";
import type { TaskDateType } from "../../../../../../../types/task-date-type";

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock custom context & hooks
const mockOpenPopup = vi.fn();
const mockHandleSelectTaskDateEdit = vi.fn();
const mockDeleteTaskDate = vi.fn().mockResolvedValue(undefined);
const mockMoveStatusTaskDate = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../../../../../context/usePopup", () => ({
  default: () => ({
    openPopup: mockOpenPopup,
  }),
}));

vi.mock("../../../../context/useSelectTaskDateEdit", () => ({
  default: () => ({
    handleSelectTaskDateEdit: mockHandleSelectTaskDateEdit,
  }),
}));

vi.mock("../../../../../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    deleteTaskDate: mockDeleteTaskDate,
    moveStatusTaskDate: mockMoveStatusTaskDate,
  }),
}));

describe("ItemTaskDate Component", () => {
  const mockSystemDate = new Date("2026-08-27T12:00:00Z");

  const baseItem: TaskDateType = {
    group_id: 1,
    group_name: "Work",
    group_color: "rgb(255, 0, 0)",
    task_id: 101,
    task_name: "Test Task",
    task_status: "pending",
    date_id: 5,
    task_date: "2026-08-27",
    start_time: "09:00:00",
    end_time: "10:30:00",
    date_status: "today",
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(mockSystemDate);
    mockNavigate.mockReset();
    mockOpenPopup.mockReset();
    mockHandleSelectTaskDateEdit.mockReset();
    mockDeleteTaskDate.mockReset().mockResolvedValue(undefined);
    mockMoveStatusTaskDate.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders task name and formatted time interval", () => {
    render(<ItemTaskDate item={baseItem} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("09:00 - 10:30")).toBeInTheDocument();
  });

  it("toggles options dropdown on click and closes on blur", () => {
    const { container } = render(<ItemTaskDate item={baseItem} />);
    const outerElement = container.querySelector(
      ".item-task-date-cell-outer",
    ) as HTMLElement;
    const dropdown = container.querySelector(
      ".container-option-task-date-item-cell",
    );

    expect(dropdown).toHaveClass("close");

    // Click to open
    fireEvent.click(outerElement);
    expect(dropdown).toHaveClass("open");

    // Click to close
    fireEvent.click(outerElement);
    expect(dropdown).toHaveClass("close");

    // Open again then trigger blur
    fireEvent.click(outerElement);
    expect(dropdown).toHaveClass("open");

    fireEvent.blur(outerElement);
    expect(dropdown).toHaveClass("close");
  });

  it("renders 'Mark Done' button when date_status is 'today' and triggers moveStatusTaskDate", async () => {
    const { container } = render(<ItemTaskDate item={baseItem} />);

    const markDoneBtn = container.querySelector(
      ".btn-mark-done-drop-down-task-date",
    ) as HTMLButtonElement;
    expect(markDoneBtn).toBeInTheDocument();

    fireEvent.click(markDoneBtn);

    await waitFor(() => {
      expect(mockMoveStatusTaskDate).toHaveBeenCalledWith(
        1,
        101,
        5,
        "completed",
      );
    });
  });

  it("does not render 'Mark Done' button when date_status is not 'today'", () => {
    const itemWait: TaskDateType = { ...baseItem, date_status: "wait" };
    const { container } = render(<ItemTaskDate item={itemWait} />);

    const markDoneBtn = container.querySelector(
      ".btn-mark-done-drop-down-task-date",
    );
    expect(markDoneBtn).not.toBeInTheDocument();
  });

  it("navigates to '/app/today-lists' when clicking Preview for today's task", () => {
    const { container } = render(<ItemTaskDate item={baseItem} />);

    const previewBtn = container.querySelector(
      ".btn-preview-drop-down-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(previewBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/app/today-lists");
  });

  it("navigates to preview page URL for non-today tasks", () => {
    const futureItem: TaskDateType = {
      ...baseItem,
      task_date: "2026-08-30",
      date_status: "wait",
    };
    const { container } = render(<ItemTaskDate item={futureItem} />);

    const previewBtn = container.querySelector(
      ".btn-preview-drop-down-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(previewBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/app/preview/2026-08-30");
  });

  it("handles Edit Task Date click correctly", () => {
    const { container } = render(<ItemTaskDate item={baseItem} />);

    const editBtn = container.querySelector(
      ".btn-edit-drop-down-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(editBtn);

    expect(mockHandleSelectTaskDateEdit).toHaveBeenCalledWith(baseItem);
    expect(mockOpenPopup).toHaveBeenCalledWith("change-time");
  });

  it("handles Delete Task Date click and calls deleteTaskDate api", async () => {
    const { container } = render(<ItemTaskDate item={baseItem} />);

    const deleteBtn = container.querySelector(
      ".btn-delete-drop-down-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockDeleteTaskDate).toHaveBeenCalledWith(1, 101, 5);
    });
  });

  it("renders status indicator for 'completed' task date status", () => {
    const completedItem: TaskDateType = {
      ...baseItem,
      date_status: "completed",
    };
    const { container } = render(<ItemTaskDate item={completedItem} />);

    const statusContainer = container.querySelector(
      ".container-show-status-of-task-date-cell",
    );
    expect(statusContainer).toBeInTheDocument();
  });

  it("renders 'Done' badge when task_status is 'done'", () => {
    const taskDoneItem: TaskDateType = {
      ...baseItem,
      task_status: "done",
      date_status: "completed",
    };
    render(<ItemTaskDate item={taskDoneItem} />);

    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
