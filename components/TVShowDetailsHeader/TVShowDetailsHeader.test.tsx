import { render, screen } from "@testing-library/react";
import TVShowDetailsHeader from "./";
import React from "react";
import { IShowInfo } from "../../types";

// Mocking the StarRatings component
jest.mock("../Ratings/StarRatings", () => {
  return {
    __esModule: true,
    default: ({ score }) => (
      <div data-testid="star-ratings">Star Rating: {score}</div>
    ),
  };
});

const mockShowData: IShowInfo = {
  show: {
    id: 123,
    name: "Show Name",
    summary: "<p>Some show summary</p>",
    image: { medium: "show_image_url" },
    rating: { average: 8.5 },
  },
};

describe("TVShowDetailsHeader", () => {
  it("renders the header title", () => {
    render(<TVShowDetailsHeader showData={mockShowData} />);
    expect(screen.getByText("Techflix Originals")).toBeInTheDocument();
  });

  it("renders the StarRatings component with the correct score", () => {
    render(<TVShowDetailsHeader showData={mockShowData} />);
    expect(screen.getByTestId("star-ratings")).toHaveTextContent(
      "Star Rating: 8.5"
    );
  });

  it("renders the show's image", () => {
    render(<TVShowDetailsHeader showData={mockShowData} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "show_image_url");
  });

  it("displays the show's name", () => {
    render(<TVShowDetailsHeader showData={mockShowData} />);
    expect(screen.getByText("Show Name")).toBeInTheDocument();
  });

  it("sanitizes and renders the show's summary", () => {
    render(<TVShowDetailsHeader showData={mockShowData} />);
    // Assuming the summary would be sanitized to plain text
    expect(screen.getByText("Some show summary")).toBeInTheDocument();
  });
});
