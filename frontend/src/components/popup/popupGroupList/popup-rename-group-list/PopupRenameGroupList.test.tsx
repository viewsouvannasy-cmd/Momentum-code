// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PopupRenameGroupList } from "./PopupRenameGroupList";

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

const mockRenameGroup = vi.fn().mockResolvedValue(undefined);
let mockIsLoadingPost = false;

vi.mock("../../../../api/group-lists/useGroupList.ts", () => ({
  default: () => ({
    isLoadingPost: mockIsLoadingPost,
    renameGroup: mockRenameGroup,
  }),
}));

describe("PopupRenameGroupList Component", () => {
  beforeEach(() => {
    mockClosePopup.mockReset();
    mockRenameGroup.mockReset().mockResolvedValue(undefined);
    mockIsOpenPopup = "rename";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
  });

  it("is hidden when isOpenPopup is not 'rename'", () => {
    mockIsOpenPopup = null;
    const { container } = render(<PopupRenameGroupList groupId={1} />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'rename'", () => {
    mockIsOpenPopup = "rename";
    const { container } = render(<PopupRenameGroupList groupId={1} />);

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(screen.getByText("Get a new name")).toBeInTheDocument();
  });

  it("submits rename group and closes popup", async () => {
    const { container } = render(<PopupRenameGroupList groupId={1} />);

    const input = screen.getByPlaceholderText("My new group list is....");
    fireEvent.change(input, { target: { value: "Renamed Group" } });

    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockRenameGroup).toHaveBeenCalledWith("Renamed Group", 1);
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup when close button is clicked", () => {
    const { container } = render(<PopupRenameGroupList groupId={1} />);

    const closeBtn = container.querySelector("form > div:first-child button") as HTMLButtonElement;
    fireEvent.click(closeBtn);

    expect(mockClosePopup).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(<PopupRenameGroupList groupId={1} />);

    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveClass("rename-group-list-btn-load");
  });
});
