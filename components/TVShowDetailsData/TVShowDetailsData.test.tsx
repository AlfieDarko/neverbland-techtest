import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TVShowDetailsData from "./";
import React from "react";
import { IShowInfo } from "../../types";

jest.mock("axios");

const mockShowData: Partial<IShowInfo> = {
  show: {
    id: 123,
    network: { name: "NetworkName" },
    schedule: { days: ["Monday", "Tuesday"] },
    status: "Running",
    genres: ["Drama", "Thriller"],
  },
};

const mockCastData = [
  {
    person: {
      id: "1",
      name: "Actor Name",
      image: { medium: "actor_image_url" },
    },
  },
];

describe("TVShowDetailsData", () => {
  it("renders show information correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCastData });

    render(<TVShowDetailsData showData={mockShowData as IShowInfo} />);

    await waitFor(() => {
      expect(screen.getByTestId("network-name")).toHaveTextContent(
        "Streamed on NetworkName"
      );

      expect(screen.getByTestId("scheduled-on")).toHaveTextContent(
        "Scheduled Monday, Tuesday"
      );

      expect(screen.getByTestId("status")).toHaveTextContent("Status Running");

      expect(screen.getByTestId("genres")).toHaveTextContent(
        "Genres Drama, Thriller"
      );
    });
  });

  it("renders cast information when available", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCastData });

    render(<TVShowDetailsData showData={mockShowData as IShowInfo} />);

    await waitFor(() => {
      const actorElements = screen.getAllByTestId("actor");
      expect(actorElements.length).toBe(mockCastData.length);
      expect(actorElements[0]).toHaveTextContent("Actor Name");
    });
  });

  it("renders a message when no cast data is available", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<TVShowDetailsData showData={mockShowData as IShowInfo} />);

    await waitFor(() => {
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });
  });
});
