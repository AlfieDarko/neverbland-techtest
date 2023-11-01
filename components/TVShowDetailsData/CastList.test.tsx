// CastList.test.js
import { render, screen } from "@testing-library/react";
import CastList from "./CastList";
import { ICastMember } from "../../types";
import React from "react";

// Mock cast data
const mockCast = [
  {
    person: {
      id: 1,
      name: "Jane Doe",
      image: { medium: "jane_doe_img.jpg" },
    },
    character: { name: "Character One" },
  },
  {
    person: {
      id: 2,
      name: "John Smith",
      image: { medium: "john_smith_img.jpg" },
    },
    character: { name: "Character Two" },
  },
];

describe("CastList", () => {
  it('displays "No cast data available" when there are no cast members', () => {
    render(<CastList cast={[]} />);
    expect(screen.getByText("No cast data available")).toBeInTheDocument();
  });

  it("displays cast members when they are provided", () => {
    render(<CastList cast={mockCast} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();

    expect(screen.getByAltText("Image of Jane Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Image of John Smith")).toBeInTheDocument();
  });
});
