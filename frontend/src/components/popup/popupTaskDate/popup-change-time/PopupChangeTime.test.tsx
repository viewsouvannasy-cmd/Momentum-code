// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PopupChangeTime } from "./PopupChangeTime";
import type { TaskDateType } from "../../../../types/task-date-type";

// Mocks
const mockClosePopup = vi.fn();
let mockIsOpenPopup: string | null = null;
let mockIsAnimation = "close";

vi.mock("../../../../context/usePopup", () => ({
  default: () => ({
    closePopup: mockClosePopup,
    isOpenPopup: mockIsOpenPopup,
    isAnimation: mockIsAnimation,
  }),
}));

const mockEditTimeTaskDate = vi.fn().mockResolvedValue(undefined);
const mockGetFilterByDate = vi.fn().mockResolvedValue(undefined);
let mockIsLoadingPost = false;

vi.mock("../../../../api/task-date/useTaskDate", () => ({
  default: () => ({
    isLoadingPost: mockIsLoadingPost,
    editTimeTaskDate: mockEditTimeTaskDate,
    getFilterByDate: mockGetFilterByDate,
  }),
}));

const mockHandleSelectTaskDateEdit = vi.fn();
let mockTaskDateSelectEdit: TaskDateType | null = null;

vi.mock(
  "../../../../page/appPage/calendarPage/context/useSelectTaskDateEdit",
  () => ({
    default: () => ({
      taskDateSelectEdit: mockTaskDateSelectEdit,
      handleSelectTaskDateEdit: mockHandleSelectTaskDateEdit,
    }),
  }),
);

describe("PopupChangeTime Component", () => {
  const dummyTaskDate: TaskDateType = {
    group_id: 1,
    group_name: "Work",
    group_color: "#ff0000",
    task_id: 101,
    task_name: "Code Review",
    task_status: "doing",
    date_id: 5,
    task_date: "2026-08-27",
    start_time: "09:00:00",
    end_time: "11:00:00",
    date_status: "today",
  };

  beforeEach(() => {
    mockClosePopup.mockReset();
    mockEditTimeTaskDate.mockReset().mockResolvedValue(undefined);
    mockGetFilterByDate.mockReset().mockResolvedValue(undefined);
    mockHandleSelectTaskDateEdit.mockReset();
    mockIsOpenPopup = "change-time";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
    mockTaskDateSelectEdit = dummyTaskDate;
  });

  it("is hidden when isOpenPopup is not 'change-time'", () => {
    mockIsOpenPopup = null;
    const { container } = render(<PopupChangeTime page="calendar" />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'change-time' and displays task info", () => {
    mockIsOpenPopup = "change-time";
    const { container } = render(<PopupChangeTime page="calendar" />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(screen.getByText(/Code Review/i)).toBeInTheDocument();
    expect(screen.getByText(/2026-08-27/i)).toBeInTheDocument();
  });

  it("opens start time picker and updates start hour", () => {
    render(<PopupChangeTime page="calendar" />);

    // Click start time box
    const startTimeBox = screen.getByText("Start Time")
      .nextElementSibling as HTMLElement;
    fireEvent.click(startTimeBox);

    // Select hour '10' (first '10' button is in HOUR column, second is in MIN column)
    const hourBtn = screen.getAllByRole("button", { name: "10" })[0];
    fireEvent.click(hourBtn);

    // Verify time box now shows updated hour '10:00'
    expect(startTimeBox.textContent).toContain("10:00");
  });

  it("submits time edit on page='calendar'", async () => {
    const { container } = render(<PopupChangeTime page="calendar" />);

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockEditTimeTaskDate).toHaveBeenCalledWith(
        1,
        101,
        5,
        "09:00",
        "11:00",
      );
      expect(mockHandleSelectTaskDateEdit).toHaveBeenCalledWith(null);
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
      expect(mockGetFilterByDate).not.toHaveBeenCalled();
    });
  });

  it("submits time edit and refreshes list on page='t-p'", async () => {
    const { container } = render(<PopupChangeTime page="t-p" />);

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockEditTimeTaskDate).toHaveBeenCalledWith(
        1,
        101,
        5,
        "09:00",
        "11:00",
      );
      expect(mockGetFilterByDate).toHaveBeenCalledWith("2026-08-27");
      expect(mockHandleSelectTaskDateEdit).toHaveBeenCalledWith(null);
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup and clears select state when close button is clicked", () => {
    const { container } = render(<PopupChangeTime page="calendar" />);

    const closeBtn = container.querySelector(
      "form > div:first-child button",
    ) as HTMLButtonElement;
    fireEvent.click(closeBtn);

    expect(mockHandleSelectTaskDateEdit).toHaveBeenCalledWith(null);
    expect(mockClosePopup).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(<PopupChangeTime page="calendar" />);

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(submitBtn).toBeDisabled();
  });
});
