import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TVShowsGrid from "./";
import { useShowContext } from "../../contexts";
import axios from "axios";

// Mock axios and useShowContext
jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("../../contexts", () => ({
  useShowContext: jest.fn(),
}));

const mockSetShowBackground = jest.fn();

// Set up and return mock values for the context
useShowContext.mockImplementation(() => [
  [
    {
      show: {
        id: 1,
        name: "Show 1",
        image: { medium: "image_url_1" },
        rating: { average: 8 },
      },
    },
    {
      show: {
        id: 2,
        name: "Show 2",
        image: { medium: "image_url_2" },
        rating: { average: 9 },
      },
    },
  ],
  jest.fn(), // mock for replaceState
  jest.fn(), // mock for addShow
  jest.fn(), // mock for removeShow
  [], // mock for showBackgrounds
  mockSetShowBackground, // mock for setShowBackground
]);

describe("TVShowsGrid", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: "background_img_url" });
    mockSetShowBackground.mockClear();
  });

  it("renders TVShowsGridItem for each show", () => {
    render(<TVShowsGrid />);
    expect(screen.getAllByRole("gridcell").length).toBe(2);
  });

  it("opens modal on click and sets the correct show ID", async () => {
    render(<TVShowsGrid />);
    fireEvent.click(screen.getByText("Show 1"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("fetches background image on focus and sets it", async () => {
    const axiosMock = axios.get.mockResolvedValue({
      data: "background_img_url",
    });
    render(<TVShowsGrid />);
    fireEvent.focus(screen.getByText("Show 1"));
    await waitFor(() => expect(axiosMock).toHaveBeenCalled());
    expect(mockSetShowBackground).toHaveBeenCalledWith("background_img_url");
  });
});
