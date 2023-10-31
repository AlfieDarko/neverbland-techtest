import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import { useShowContext } from "../../contexts"; // Path might differ
import { motion, useAnimation } from "framer-motion"; // You'll mock this too

import LandingHeader from "."; // Path might differ
// Mocking the necessary hooks and components
// Mocking the necessary hooks and components
// Mocking the framer-motion components
jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn((props) => <div {...props} />),
    img: jest.fn((props) => <img {...props} />),
  },
  useAnimation: () => ({
    set: jest.fn(),
    start: jest.fn().mockResolvedValue(null), // simplifying the promise mock
    stop: jest.fn(),
    subscribe: jest.fn(() => ({ unsubscribe: jest.fn() })), // Add mock subscribe function
  }),
}));

const backgroundsMock = [
  {
    resolutions: {
      original: {
        url: "test-image-url.jpg",
      },
    },
  },
];

describe("LandingHeader", () => {
  it("renders without crashing", () => {
    const { container } = render(<LandingHeader backgrounds={[]} />);
    expect(container).toBeInTheDocument();
  });

  it("displays a background image when provided", () => {
    render(<LandingHeader backgrounds={backgroundsMock} />);
    const backgroundImage = screen.getByRole("img", {
      name: /background image/i,
    });
    expect(backgroundImage).toBeInTheDocument();
  });

  // Additional tests can go here...
});
