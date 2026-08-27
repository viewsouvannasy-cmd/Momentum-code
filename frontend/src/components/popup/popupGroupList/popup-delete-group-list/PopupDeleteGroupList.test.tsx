// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { PopupDeleteGroupList } from "./PopupDeleteGroupList";

// Mocks
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

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

const mockDeleteGroup = vi.fn().mockResolvedValue(undefined);
let mockIsLoadingPost = false;

vi.mock("../../../../api/group-lists/useGroupList.ts", () => ({
  default: () => ({
    isLoadingPost: mockIsLoadingPost,
    deleteGroup: mockDeleteGroup,
  }),
}));

describe("PopupDeleteGroupList Component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockClosePopup.mockReset();
    mockDeleteGroup.mockReset().mockResolvedValue(undefined);
    mockIsOpenPopup = "delete";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
  });

  it("is hidden when isOpenPopup is not 'delete'", () => {
    mockIsOpenPopup = null;
    const { container } = render(
      <PopupDeleteGroupList groupId={1} group_name="Work" />,
    );

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'delete' and displays group name", () => {
    mockIsOpenPopup = "delete";
    const { container } = render(
      <PopupDeleteGroupList groupId={1} group_name="Work" />,
    );

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(
      screen.getByText("Are you sure to delete Work group?"),
    ).toBeInTheDocument();
  });

  it("confirms group deletion and navigates to '/app/inbox'", async () => {
    render(<PopupDeleteGroupList groupId={1} group_name="Work" />);

    const confirmBtn = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockDeleteGroup).toHaveBeenCalledWith(1);
      expect(mockNavigate).toHaveBeenCalledWith("/app/inbox");
    });
  });

  it("closes popup when Cancel button is clicked", () => {
    render(<PopupDeleteGroupList groupId={1} group_name="Work" />);

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockClosePopup).toHaveBeenCalledTimes(1);
  });

  it("disables confirm button when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(
      <PopupDeleteGroupList groupId={1} group_name="Work" />,
    );

    const confirmBtn = container.querySelector(
      ".btn-delete-group-list-load",
    ) as HTMLButtonElement;
    expect(confirmBtn).toBeDisabled();
  });
});
