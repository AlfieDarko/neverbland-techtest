import React from "react";
import { render, screen } from "@testing-library/react";
import TVShowsGridItem from "./";
import StarRatings from "../Ratings/StarRatings";

// Mocking the StarRatings component
jest.mock("../Ratings/StarRatings", () => {
  return {
    __esModule: true,
    default: ({ score }) => <div>Star Ratings: {score}</div>,
  };
});

describe("TVShowsGridItem", () => {
  const mockProps = {
    title: "Test Show",
    image: "test_image.jpg",
    score: 8,
    id: 1,
  };

  it("renders the title", () => {
    render(<TVShowsGridItem {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  it("renders the image with the correct src", () => {
    render(<TVShowsGridItem {...mockProps} />);
    const image = screen.getByRole("img", { name: mockProps.title });
    expect(image).toHaveAttribute("src", mockProps.image);
  });

  it("renders a fallback image when none is provided", () => {
    const fallbackImage = "/images/no_movie_cover.png";
    // Provide mockProps without an image
    const { title, score, id } = mockProps;
    render(<TVShowsGridItem title={title} score={score} id={id} />);
    const image = screen.getByRole("img", { name: title });
    expect(image).toHaveAttribute("src", fallbackImage);
  });

  it("renders the StarRatings component with the correct score", () => {
    render(<TVShowsGridItem {...mockProps} />);
    expect(
      screen.getByText(`Star Ratings: ${mockProps.score}`)
    ).toBeInTheDocument();
  });

  // If you want to test the hover animation, you will need to use a library that can trigger
  // the 'onHover' event since @testing-library/react does not currently support this.
});
