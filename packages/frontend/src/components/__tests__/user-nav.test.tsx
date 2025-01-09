import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UserNav } from "../user-nav";
import { renderWithRouter } from "../../test/utils";

const mockUser = {
  heroName: "Test Hero",
  level: 5,
  xpPoints: 1000,
  gold: 500,
};

describe("UserNav", () => {
  beforeEach(() => {
    // Reset the document body before each test
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders user avatar with correct initials", async () => {
    await act(async () => {
      renderWithRouter(<UserNav user={mockUser} />);
    });
    expect(screen.getByText("Te")).toBeInTheDocument();
  });

  it("shows user information when dropdown is opened", async () => {
    const user = userEvent.setup();
    await act(async () => {
      renderWithRouter(<UserNav user={mockUser} />);
    });

    // Find and click the trigger button
    const trigger = screen.getByRole("button");
    await act(async () => {
      await user.click(trigger);
    });

    // Wait for all elements to be present and assertions to pass
    await waitFor(
      () => {
        expect(screen.getByText(/Level 5/)).toBeInTheDocument();
        expect(screen.getByText(/1000 XP/)).toBeInTheDocument();
        expect(screen.getByText(/500 Gold/)).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it("displays navigation items when dropdown is opened", async () => {
    const user = userEvent.setup();
    await act(async () => {
      renderWithRouter(<UserNav user={mockUser} />);
    });

    // Find and click the trigger button
    const trigger = screen.getByRole("button");
    await act(async () => {
      await user.click(trigger);
    });

    // Wait for all elements to be present and assertions to pass
    await waitFor(
      () => {
        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Log out")).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });
});
