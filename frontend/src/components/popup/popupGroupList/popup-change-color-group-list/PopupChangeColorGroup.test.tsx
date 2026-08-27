// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { PopupChangeColorGroup } from "./PopupChangeColorGroup";

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

const mockChangeColorGroup = vi.fn().mockResolvedValue(undefined);
let mockIsLoadingPost = false;

vi.mock("../../../../api/group-lists/useGroupList.ts", () => ({
  default: () => ({
    isLoadingPost: mockIsLoadingPost,
    changeColorGroup: mockChangeColorGroup,
  }),
}));

describe("PopupChangeColorGroup Component", () => {
  beforeEach(() => {
    mockClosePopup.mockReset();
    mockChangeColorGroup.mockReset().mockResolvedValue(undefined);
    mockIsOpenPopup = "change-color";
    mockIsAnimation = "open";
    mockIsLoadingPost = false;
  });

  it("is hidden when isOpenPopup is not 'change-color'", () => {
    mockIsOpenPopup = null;
    const { container } = render(
      <PopupChangeColorGroup
        groupId={1}
        group_name="Work"
        group_color="rgb(255, 0, 0)"
      />,
    );

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("none");
  });

  it("is visible when isOpenPopup is 'change-color' and previews group name", () => {
    mockIsOpenPopup = "change-color";
    const { container } = render(
      <PopupChangeColorGroup
        groupId={1}
        group_name="Work"
        group_color="rgb(255, 0, 0)"
      />,
    );

    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.style.display).toBe("flex");
    expect(screen.getByText("Work")).toBeInTheDocument();
  });

  it("submits new group color and closes popup", async () => {
    const { container } = render(
      <PopupChangeColorGroup
        groupId={1}
        group_name="Work"
        group_color="rgb(255, 0, 0)"
      />,
    );

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockChangeColorGroup).toHaveBeenCalledWith(
        expect.stringMatching(/^rgba\(/),
        1,
      );
      expect(mockClosePopup).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup when close button is clicked", () => {
    const { container } = render(
      <PopupChangeColorGroup
        groupId={1}
        group_name="Work"
        group_color="rgb(255, 0, 0)"
      />,
    );

    const closeBtn = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;
    fireEvent.click(closeBtn);

    expect(mockClosePopup).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when isLoadingPost is true", () => {
    mockIsLoadingPost = true;
    const { container } = render(
      <PopupChangeColorGroup
        groupId={1}
        group_name="Work"
        group_color="rgb(255, 0, 0)"
      />,
    );

    const submitBtn = container.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveClass("btn-save-change-color-group-list-load");
  });
});
