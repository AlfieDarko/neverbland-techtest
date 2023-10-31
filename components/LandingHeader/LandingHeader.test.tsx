import React from "react";
import { render, screen } from "@testing-library/react";

import LandingHeader from ".";

jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn((props) => <div {...props} />),
    img: jest.fn((props) => <img {...props} />),
  },
  useAnimation: () => ({
    set: jest.fn(),
    start: jest.fn().mockResolvedValue(null),
    stop: jest.fn(),
    subscribe: jest.fn(() => ({ unsubscribe: jest.fn() })),
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
});
