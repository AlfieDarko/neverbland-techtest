import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import SearchBar from "./";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the Spinner component
jest.mock("./Spinner", () => () => <div data-testid="spinner">Spinner</div>);

describe("SearchBar", () => {
  // Initialize a local variable to simulate the isShowDataLoading state
  let isShowDataLoading = false;
  const setShowDataMock = jest.fn();

  // Setup the mock for setIsShowDataLoading to update the isShowDataLoading variable
  const setIsShowDataLoadingMock = jest.fn((state) => {
    isShowDataLoading = state;
  });

  beforeEach(() => {
    // Clear all mocks before each test
    mockedAxios.get.mockClear();
    setShowDataMock.mockClear();
    setIsShowDataLoadingMock.mockClear();

    // Reset the isShowDataLoading before each test
    isShowDataLoading = false;

    // Setup axios to resolve with empty data
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

    // Simulate user input
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });

    // Simulate the Enter key press
    fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

    // expect(screen.getByTestId("spinner")).toBeInTheDocument();
    // Wait for setIsShowDataLoadingMock to be called
    await waitFor(() => {
      expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(true);
    });

    // Force a re-render of the component with the updated isShowDataLoading state
    // to display the spinner
    rerender(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={true} // now true
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    // The spinner should now
    // The spinner should now be displayed because isShowDataLoading is true
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  it("hides the spinner after data fetch completes", async () => {
    // Mock the axios call to resolve immediately with data
    mockedAxios.get.mockResolvedValueOnce({ data: { shows: [] } });

    const { rerender } = render(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={isShowDataLoading}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    // Simulate user input and the Enter key press
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

    // Initially, setIsShowDataLoading should be called with true
    expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(true);

    // Since we mocked the axios call to resolve immediately, we can assert that
    // setIsShowDataLoading should have been called with false right after
    await waitFor(() => {
      expect(setIsShowDataLoadingMock).toHaveBeenCalledWith(false);
    });

    // Manually update the isShowDataLoading to false and rerender to reflect the changes
    rerender(
      <SearchBar
        setShowData={setShowDataMock}
        isShowDataLoading={false}
        setIsShowDataLoading={setIsShowDataLoadingMock}
      />
    );

    // The spinner should not be displayed anymore because isShowDataLoading is false
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  // ... other tests
});
