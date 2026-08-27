// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CellItem } from "./CellItem";
import type { TaskDateType } from "../../../../../../types/task-date-type";

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock custom hooks
const mockSelectDateCell = vi.fn();
const mockOpenSideDrawer = vi.fn();
const mockMoveStatusTaskDate = vi.fn();

let mockTaskDateData: TaskDateType[] = [];

vi.mock("../../../context/useSelectDateOnCalendar", () => ({
  default: () => ({
    selectDateCell: mockSelectDateCell,
  }),
}));

vi.mock("../../../context/useOpenSideDrawerCalendar", () => ({
  default: () => ({
    openSideDrawer: mockOpenSideDrawer,
  }),
}));

vi.mock("../../../../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    taskDateData: mockTaskDateData,
    moveStatusTaskDate: mockMoveStatusTaskDate,
  }),
}));

// Mock child component ItemTaskDate
vi.mock("./itemTaskDate/ItemTaskDate", () => ({
  ItemTaskDate: ({ item }: { item: TaskDateType }) => (
    <div data-testid="item-task-date">{item.task_name}</div>
  ),
}));

describe("CellItem Component", () => {
  const mockSystemDate = new Date("2026-08-27T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(mockSystemDate);
    mockNavigate.mockReset();
    mockSelectDateCell.mockReset();
    mockOpenSideDrawer.mockReset();
    mockMoveStatusTaskDate.mockReset();
    mockTaskDateData = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the date number correctly", () => {
    render(<CellItem cellId="2026-08-27" date={27} />);

    expect(screen.getByText("27")).toBeInTheDocument();
  });

  it("applies the 'today' class when cellId is today", () => {
    render(<CellItem cellId="2026-08-27" date={27} />);

    const dateElement = screen.getByText("27");
    expect(dateElement).toHaveClass("today");
  });

  it("does not apply the 'today' class when cellId is not today", () => {
    render(<CellItem cellId="2026-08-28" date={28} />);

    const dateElement = screen.getByText("28");
    expect(dateElement).not.toHaveClass("today");
  });

  it("applies 'cell-calendar' class for present or future dates", () => {
    const { container } = render(<CellItem cellId="2026-08-27" date={27} />);
    const cellElement = container.firstChild as HTMLElement;

    expect(cellElement).toHaveClass("cell-calendar");
    expect(cellElement).not.toHaveClass("cell-calendar-past");
  });

  it("applies 'cell-calendar-past' class for past dates", () => {
    const { container } = render(<CellItem cellId="2026-08-20" date={20} />);
    const cellElement = container.firstChild as HTMLElement;

    expect(cellElement).toHaveClass("cell-calendar-past");
  });

  it("filters and renders task items matching cellId", () => {
    mockTaskDateData = [
      {
        group_id: 1,
        group_name: "Work",
        group_color: "#ff0000",
        task_id: 101,
        task_name: "Today Task",
        task_status: "pending",
        date_id: 1,
        task_date: "2026-08-27",
        start_time: "09:00",
        end_time: "10:00",
        date_status: "today",
      },
      {
        group_id: 1,
        group_name: "Work",
        group_color: "#ff0000",
        task_id: 102,
        task_name: "Other Day Task",
        task_status: "pending",
        date_id: 2,
        task_date: "2026-08-28",
        start_time: "11:00",
        end_time: "12:00",
        date_status: "wait",
      },
    ];

    render(<CellItem cellId="2026-08-27" date={27} />);

    const renderedTasks = screen.getAllByTestId("item-task-date");
    expect(renderedTasks).toHaveLength(1);
    expect(screen.getByText("Today Task")).toBeInTheDocument();
    expect(screen.queryByText("Other Day Task")).not.toBeInTheDocument();
  });

  it("selects date cell and opens side drawer when clicking present/future date", () => {
    const { container } = render(<CellItem cellId="2026-08-27" date={27} />);
    const cellElement = container.firstChild as HTMLElement;

    fireEvent.click(cellElement);

    expect(mockSelectDateCell).toHaveBeenCalledWith("2026-08-27");
    expect(mockOpenSideDrawer).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("navigates to preview page when clicking a past date", () => {
    const { container } = render(<CellItem cellId="2026-08-20" date={20} />);
    const cellElement = container.firstChild as HTMLElement;

    fireEvent.click(cellElement);

    expect(mockNavigate).toHaveBeenCalledWith("/app/preview/2026-08-20");
    expect(mockSelectDateCell).not.toHaveBeenCalled();
    expect(mockOpenSideDrawer).not.toHaveBeenCalled();
  });

  it("automatically moves status to 'today' for eligible tasks on today's date", async () => {
    mockTaskDateData = [
      {
        group_id: 1,
        group_name: "Work",
        group_color: "#ff0000",
        task_id: 101,
        task_name: "Pending Task",
        task_status: "pending",
        date_id: 1,
        task_date: "2026-08-27",
        start_time: "09:00",
        end_time: "10:00",
        date_status: "wait",
      },
      {
        group_id: 1,
        group_name: "Work",
        group_color: "#ff0000",
        task_id: 102,
        task_name: "Completed Task",
        task_status: "done",
        date_id: 2,
        task_date: "2026-08-27",
        start_time: "10:00",
        end_time: "11:00",
        date_status: "completed",
      },
    ];

    render(<CellItem cellId="2026-08-27" date={27} />);

    await waitFor(() => {
      expect(mockMoveStatusTaskDate).toHaveBeenCalledWith(1, 101, 1, "today");
    });
    expect(mockMoveStatusTaskDate).not.toHaveBeenCalledWith(1, 102, 2, "today");
  });

  it("automatically moves status to 'miss' for eligible tasks on yesterday's date", async () => {
    // Today is 2026-08-27, yesterday is 2026-08-26
    mockTaskDateData = [
      {
        group_id: 2,
        group_name: "Study",
        group_color: "#00ff00",
        task_id: 201,
        task_name: "Unfinished Yesterday Task",
        task_status: "pending",
        date_id: 10,
        task_date: "2026-08-26",
        start_time: "14:00",
        end_time: "15:00",
        date_status: "today",
      },
      {
        group_id: 2,
        group_name: "Study",
        group_color: "#00ff00",
        task_id: 202,
        task_name: "Already Missed Task",
        task_status: "pending",
        date_id: 11,
        task_date: "2026-08-26",
        start_time: "15:00",
        end_time: "16:00",
        date_status: "miss",
      },
    ];

    render(<CellItem cellId="2026-08-26" date={26} />);

    await waitFor(() => {
      expect(mockMoveStatusTaskDate).toHaveBeenCalledWith(2, 201, 10, "miss");
    });
    expect(mockMoveStatusTaskDate).not.toHaveBeenCalledWith(2, 202, 11, "miss");
  });
});
