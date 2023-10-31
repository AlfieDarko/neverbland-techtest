import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import SearchBar from "./";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("./Spinner", () => () => <div data-testid="spinner">Spinner</div>);

describe("SearchBar", () => {
  let isShowDataLoading = false;
  const setShowDataMock = jest.fn();

  const setIsShowDataLoadingMock = jest.fn((state) => {
    isShowDataLoading = state;
  });

  beforeEach(() => {
    mockedAxios.get.mockClear();
    setShowDataMock.mockClear();
    setIsShowDataLoadingMock.mockClear();

    isShowDataLoading = false;

    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it("initiates a search and displays the spinner when the user types a query", async () => {
    const { rerender } = render(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={isShowDataLoading}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });

    fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(true);
    });

    rerender(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={true}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  it("hides the spinner after data fetch completes", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { shows: [] } });

    const { rerender } = render(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={isShowDataLoading}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

    expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(false);
    });

    rerender(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={false}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
});
