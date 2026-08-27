// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { PopupAddTask } from "./PopupAddTask";

// Mocks
const mockClosePopup = vi.fn();
let mockIsOpenPopup: string | null = null;
let mockIsAnimation = "close";

vi.mock("../../../../context/usePopup.ts", () => ({
  default: () => ({
    closePopup: mockClosePopup,
    isOpenPopup: mockIsOpenPopup,
    isAnimation: mockIsAnimation,
  }),
}));

const mockGroupListData = [
  { group_id: 1, group_name: "Work", group_color: "#ff0000" },
  { group_id: 2, group_name: "Personal", group_color: "#00ff00" },
];

vi.mock("../../../../api/group-lists/useGroupList.ts", () => ({
  default: () => ({
    groupListData: mockGroupListData,
  }),
}));

const mockAddTask = vi.fn().mockResolvedValue(undefined);
let mockTaskData: any[] = [];
let mockIsLoadingPost = false;

vi.mock("../../../../api/task/useTask.ts", () => ({
  default: () => ({
    taskData: mockTaskData,
    addTask: mockAddTask,
    isLoadingPost: mockIsLoadingPost,
  }),
}));

describe("PopupAddTask Component", () => {
  beforeEach(() => {
    mockClosePopup.mockReset();
    mockAddTask.mockReset().mockResolvedValue(undefined);
    mockIsOpenPopup = "add-task";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
    mockTaskData = [];
  });

  it("is hidden when isOpenPopup is not 'add-task'", () => {
    mockIsOpenPopup = null;
    const { container } = render(<PopupAddTask />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'add-task'", () => {
    mockIsOpenPopup = "add-task";
    const { container } = render(<PopupAddTask />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(screen.getByText("Add new task to do")).toBeInTheDocument();
  });

  it("displays error message if form is submitted without selecting a group", () => {
    const { container } = render(<PopupAddTask />);

    const input = screen.getByPlaceholderText("My new tast to do is....");
    fireEvent.change(input, { target: { value: "New Task Title" } });

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    fireEvent.click(submitBtn);

    const errorMessage = screen.getByText("Please select on group list");
    expect(errorMessage.style.display).toBe("initial");
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it("selects a group from dropdown and submits task successfully", async () => {
    const { container } = render(<PopupAddTask />);

    // Type task name
    const input = screen.getByPlaceholderText("My new tast to do is....");
    fireEvent.change(input, { target: { value: "Design landing page" } });

    // Open group selection list
    const selectTrigger = container.querySelector(
      ".container-display-box-group-list",
    ) as HTMLElement;
    fireEvent.click(selectTrigger);

    // Select 'Work' group
    const groupOption = screen.getByText("Work");
    fireEvent.click(groupOption);

    // Submit form
    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith(1, "Design landing page");
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup and resets input when close button is clicked", () => {
    const { container } = render(<PopupAddTask />);

    const input = screen.getByPlaceholderText(
      "My new tast to do is....",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Draft title" } });
    expect(input.value).toBe("Draft title");

    const closeBtn = container.querySelector(
      "form > div:first-child > button",
    ) as HTMLButtonElement;
    fireEvent.click(closeBtn);

    expect(mockClosePopup).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("");
  });

  it("shows loading state and disables button when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(<PopupAddTask />);

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveClass("add-task-btn-load");
  });
});
