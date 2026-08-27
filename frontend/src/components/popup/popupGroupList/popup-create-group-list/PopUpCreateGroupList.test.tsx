// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PopUpCreateGroupList } from "./PopUpCreateGroupList";

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

const mockCreateGroup = vi.fn().mockResolvedValue(undefined);
let mockIsLoadingPost = false;

vi.mock("../../../../api/group-lists/useGroupList.ts", () => ({
  default: () => ({
    isLoadingPost: mockIsLoadingPost,
    createGroup: mockCreateGroup,
  }),
}));

describe("PopUpCreateGroupList Component", () => {
  beforeEach(() => {
    mockClosePopup.mockReset();
    mockCreateGroup.mockReset().mockResolvedValue(undefined);
    mockIsOpenPopup = "create";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
  });

  it("is hidden when isOpenPopup is not 'create'", () => {
    mockIsOpenPopup = null;
    const { container } = render(<PopUpCreateGroupList />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'create'", () => {
    mockIsOpenPopup = "create";
    const { container } = render(<PopUpCreateGroupList />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(screen.getByText("Create Group List")).toBeInTheDocument();
  });

  it("submits group creation with name and converted rgba color", async () => {
    const { container } = render(<PopUpCreateGroupList />);

    const nameInput = screen.getByPlaceholderText("My group name is....");
    fireEvent.change(nameInput, { target: { value: "Projects" } });

    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateGroup).toHaveBeenCalledWith("Projects", expect.stringMatching(/^rgba\(/));
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup and clears input when close button is clicked", () => {
    const { container } = render(<PopUpCreateGroupList />);

    const nameInput = screen.getByPlaceholderText("My group name is....") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Draft Group" } });

    const closeBtn = container.querySelector("form > div:first-child button") as HTMLButtonElement;
    fireEvent.click(closeBtn);

    expect(mockClosePopup).toHaveBeenCalledTimes(1);
    expect(nameInput.value).toBe("");
  });

  it("shows loading state when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(<PopUpCreateGroupList />);

    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn).toHaveClass("create-group-list-btn-load");
  });
});
