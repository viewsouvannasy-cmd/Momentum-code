// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ItemTaskDateStatus } from "./ItemTaskDateStatus";
import type { TaskDateType } from "../../../../../../types/task-date-type";

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock api hook
const mockDeleteTaskDate = vi.fn().mockResolvedValue(undefined);
const mockMoveStatusTaskDate = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    deleteTaskDate: mockDeleteTaskDate,
    moveStatusTaskDate: mockMoveStatusTaskDate,
  }),
}));

describe("ItemTaskDateStatus Component", () => {
  const baseItem: TaskDateType = {
    group_id: 1,
    group_name: "Work",
    group_color: "rgb(255, 0, 0)",
    task_id: 101,
    task_name: "Status Task",
    task_status: "pending",
    date_id: 10,
    task_date: "2026-08-30",
    start_time: "09:00:00",
    end_time: "10:30:00",
    date_status: "wait",
  };

  beforeEach(() => {
    mockNavigate.mockReset();
    mockDeleteTaskDate.mockReset().mockResolvedValue(undefined);
    mockMoveStatusTaskDate.mockReset().mockResolvedValue(undefined);
  });

  it("renders task name, group name, and time interval without date prefix when status is 'today'", () => {
    render(<ItemTaskDateStatus item={baseItem} status="today" />);

    expect(screen.getByText("Status Task")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("09:00 - 10:30")).toBeInTheDocument();
  });

  it("renders date prefix with time interval when status is not 'today'", () => {
    render(<ItemTaskDateStatus item={baseItem} status="wait" />);

    expect(screen.getByText("2026-08-30 · 09:00 - 10:30")).toBeInTheDocument();
  });

  it("renders preview and delete buttons for status 'wait'", () => {
    const { container } = render(
      <ItemTaskDateStatus item={baseItem} status="wait" />,
    );

    const previewBtn = container.querySelector(".preview-btn-task-date");
    const deleteBtn = container.querySelector(".delete-btn-task-date");

    expect(previewBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("navigates to preview page when clicking preview button for status 'wait'", () => {
    const { container } = render(
      <ItemTaskDateStatus item={baseItem} status="wait" />,
    );

    const previewBtn = container.querySelector(
      ".preview-btn-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(previewBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/app/preview/2026-08-30");
  });

  it("calls deleteTaskDate when clicking delete button for status 'wait'", async () => {
    const { container } = render(
      <ItemTaskDateStatus item={baseItem} status="wait" />,
    );

    const deleteBtn = container.querySelector(
      ".delete-btn-task-date",
    ) as HTMLButtonElement;
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockDeleteTaskDate).toHaveBeenCalledWith(1, 101, 10);
    });
  });

  it("renders mark done button for status 'today' and calls moveStatusTaskDate", async () => {
    const { container } = render(
      <ItemTaskDateStatus item={baseItem} status="today" />,
    );

    const markDoneBtn = container.querySelector(
      ".mark-done-btn-task-date",
    ) as HTMLButtonElement;
    expect(markDoneBtn).toBeInTheDocument();

    fireEvent.click(markDoneBtn);

    await waitFor(() => {
      expect(mockMoveStatusTaskDate).toHaveBeenCalledWith(
        1,
        101,
        10,
        "completed",
      );
    });
  });

  it("renders 'Completed' text badge for status 'completed'", () => {
    render(<ItemTaskDateStatus item={baseItem} status="completed" />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toHaveClass(
      "message-completed-task-date",
    );
  });

  it("renders 'Miss' text badge for status 'miss'", () => {
    render(<ItemTaskDateStatus item={baseItem} status="miss" />);

    expect(screen.getByText("Miss")).toBeInTheDocument();
    expect(screen.getByText("Miss")).toHaveClass("message-miss-task-date");
  });
});
