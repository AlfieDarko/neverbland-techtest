import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Modal from ".";
import { mockShowInfo as mockShow } from "./mockData";

jest.mock("../TVShowDetailsHeader", () => (props) => (
  <div data-testid="tvshow-details-header-mock">
    TV Show Details Header Content
  </div>
));
jest.mock("../TVShowDetailsData", () => (props) => (
  <div data-testid="tvshow-details-data-mock">TV Show Details Data Content</div>
));

describe("Modal from a User's Perspective", () => {
  it("renders the modal when isOpen is true", () => {
    render(<Modal isOpen={true} show={mockShow} closeModal={() => {}} />);
    expect(
      screen.getByTestId("tvshow-details-header-mock")
    ).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-details-data-mock")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(<Modal isOpen={false} show={mockShow} closeModal={() => {}} />);
    expect(
      screen.queryByTestId("tvshow-details-header-mock")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("tvshow-details-data-mock")
    ).not.toBeInTheDocument();
  });

  it("closes modal on exit", async () => {
    let isOpen = true;
    const closeModalMock = jest.fn(() => {
      isOpen = false;
    });

    const { rerender } = render(
      <Modal isOpen={isOpen} show={mockShow} closeModal={closeModalMock} />
    );

    const modal = screen.getByRole("dialog");
    fireEvent.keyDown(modal, { key: "Escape", code: "Escape" });

    rerender(
      <Modal isOpen={isOpen} show={mockShow} closeModal={closeModalMock} />
    );

    await waitFor(() => expect(isOpen).toBe(false), { timeout: 1000 });
    await waitFor(() => expect(closeModalMock).toHaveBeenCalled(), {
      timeout: 1000,
    });
    await waitFor(() => expect(modal).not.toBeInTheDocument(), {
      timeout: 1000,
    });
    await waitFor(() => expect(modal).not.toBeInTheDocument(), {
      timeout: 1000,
    });
  });
});
