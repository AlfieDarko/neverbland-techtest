import React from "react";
import { render, screen } from "@testing-library/react";
import StarRatings from "./StarRatings";

jest.mock("./Star", () => () => <span data-testid="star">★</span>);
jest.mock("./HalfStar", () => () => <span data-testid="half-star">½</span>);

describe("<StarRatings />", () => {
  it("renders without crashing", () => {
    render(<StarRatings score={5} />);
  });

  it("displays question mark for null score", () => {
    render(<StarRatings score={null} />);
    expect(screen.getByText("❓")).toBeInTheDocument();
  });

  it("displays gross face for low scores", () => {
    render(<StarRatings score={0.4} />);
    expect(screen.getByText("🤮")).toBeInTheDocument();
  });

  it("displays correct number of full stars", () => {
    render(<StarRatings score={6} />);
    const fullStars = screen.getAllByTestId("star");
    expect(fullStars).toHaveLength(3);
  });

  it("displays half star when needed", () => {
    render(<StarRatings score={7} />);
    const halfStar = screen.getByTestId("half-star");
    expect(halfStar).toBeInTheDocument();
  });

  it("does not display half star when not needed", () => {
    render(<StarRatings score={8} />);
    const halfStars = screen.queryAllByTestId("half-star");
    expect(halfStars).toHaveLength(0);
  });
});
