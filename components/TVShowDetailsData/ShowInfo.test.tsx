import { render, screen } from "@testing-library/react";
import ShowInfo from "./ShowInfo";
import React from "react";
import { IShowInfo } from "../../types";

describe("ShowInfo Component", () => {
  // Test data
  const showData = {
    show: {
      network: { name: "NetworkName" },
      schedule: { days: ["Monday", "Wednesday"] },
      status: "Running",
      genres: ["Drama", "Thriller"],
    },
  };

  const showDataWithMissingInfo = {
    score: null,
    show: {
      network: null,
      schedule: null,
      status: "",
      genres: "",
    },
  };

  test("renders with all details provided", () => {
    render(<ShowInfo show={showData as IShowInfo} />);

    expect(screen.getByText("Streamed on")).toBeInTheDocument();
    expect(screen.getByText("NetworkName")).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByText("Monday, Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("Genres")).toBeInTheDocument();
    expect(screen.getByText("Drama, Thriller")).toBeInTheDocument();
  });

  test('renders "Unknown" when details are missing', () => {
    render(<ShowInfo show={showDataWithMissingInfo} />);

    // The labels should still be rendered
    expect(screen.getByText("Streamed on")).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Genres")).toBeInTheDocument();
    // All missing details should fallback to "Unknown"
    expect(screen.getAllByText("Unknown").length).toBe(4);
  });
});
