// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { ItemTaskTodayList } from "./ItemTaskDateTodayList";
import type { TaskDateType } from "../../../types/task-date-type";

// Mock api hook
const mockDeleteTaskDate = vi.fn().mockResolvedValue(undefined);
const mockMoveStatusTaskDate = vi.fn().mockResolvedValue(undefined);
const mockGetFilterByDate = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    deleteTaskDate: mockDeleteTaskDate,
    moveStatusTaskDate: mockMoveStatusTaskDate,
    getFilterByDate: mockGetFilterByDate,
  }),
}));

// Mock context hooks
const mockOpenPopup = vi.fn();
const mockHandleSelectTaskDateEdit = vi.fn();

vi.mock("../../../context/usePopup", () => ({
  default: () => ({
    openPopup: mockOpenPopup,
  }),
}));

vi.mock(
  "../../../page/appPage/calendarPage/context/useSelectTaskDateEdit",
  () => ({
    default: () => ({
      handleSelectTaskDateEdit: mockHandleSelectTaskDateEdit,
    }),
  }),
);

describe("ItemTaskTodayList Component", () => {
  const mockSystemDate = new Date("2026-08-27T12:00:00Z");

  const baseItem: TaskDateType = {
    group_id: 1,
    group_name: "Work",
    group_color: "rgb(255, 0, 0)",
    task_id: 101,
    task_name: "Today Task",
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
    mockDeleteTaskDate.mockReset().mockResolvedValue(undefined);
    mockMoveStatusTaskDate.mockReset().mockResolvedValue(undefined);
    mockGetFilterByDate.mockReset().mockResolvedValue(undefined);
    mockOpenPopup.mockReset();
    mockHandleSelectTaskDateEdit.mockReset();
  });

  it("renders task name, group name, and formatted time range", () => {
    render(<ItemTaskTodayList item={baseItem} />);

    expect(screen.getByText("Today Task")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("09:00 - 10:30")).toBeInTheDocument();
  });

  it("calls deleteTaskDate and getFilterByDate on delete button click", async () => {
    const { container } = render(<ItemTaskTodayList item={baseItem} />);

    const deleteBtn = container.querySelector(
      ".btn-delete-task-date-to-do",
    ) as HTMLButtonElement;
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockDeleteTaskDate).toHaveBeenCalledWith(1, 101, 5);
      expect(mockGetFilterByDate).toHaveBeenCalledWith("2026-08-27");
    });
  });

  it("calls handleSelectTaskDateEdit and openPopup on edit button click", () => {
    const { container } = render(<ItemTaskTodayList item={baseItem} />);

    const editBtn = container.querySelector(
      ".btn-edit-task-date-to-do",
    ) as HTMLButtonElement;
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);

    expect(mockHandleSelectTaskDateEdit).toHaveBeenCalledWith(baseItem);
    expect(mockOpenPopup).toHaveBeenCalledWith("change-time");
  });

  it("calls moveStatusTaskDate and getFilterByDate on complete button click for 'today' status", async () => {
    const { container } = render(<ItemTaskTodayList item={baseItem} />);

    const tickBtn = container.querySelector(
      ".btn-tick-complete-task-date-to-do",
    ) as HTMLButtonElement;
    expect(tickBtn).toBeInTheDocument();

    fireEvent.click(tickBtn);

    await waitFor(() => {
      expect(mockMoveStatusTaskDate).toHaveBeenCalledWith(
        1,
        101,
        5,
        "completed",
      );
      expect(mockGetFilterByDate).toHaveBeenCalledWith("2026-08-27");
    });
  });

  it("does not render tick complete button when date_status is not 'today'", () => {
    const waitItem: TaskDateType = { ...baseItem, date_status: "wait" };
    const { container } = render(<ItemTaskTodayList item={waitItem} />);

    const tickBtn = container.querySelector(
      ".btn-tick-complete-task-date-to-do",
    );
    expect(tickBtn).not.toBeInTheDocument();
  });

  it("renders status badge 'Miss' when date_status is 'miss'", () => {
    const missItem: TaskDateType = { ...baseItem, date_status: "miss" };
    render(<ItemTaskTodayList item={missItem} />);

    expect(screen.getByText("Miss")).toBeInTheDocument();
    expect(screen.getByText("Miss")).toHaveClass("miss");
  });

  it("renders status badge 'Completed' when date_status is 'completed'", () => {
    const completedItem: TaskDateType = {
      ...baseItem,
      date_status: "completed",
    };
    render(<ItemTaskTodayList item={completedItem} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toHaveClass("completed");
  });

  it("renders status badge 'Done' when task_status is 'done'", () => {
    const doneItem: TaskDateType = { ...baseItem, task_status: "done" };
    render(<ItemTaskTodayList item={doneItem} />);

    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Done")).toHaveClass("done");
  });
});
