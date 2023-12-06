import { render, screen } from "@testing-library/react";
import ShowDetail from "./ShowDetail";
import React from "react";

describe("ShowDetail Component", () => {
  test("renders with label and content", () => {
    render(
      <ShowDetail
        label="Test Label"
        content="Test Content"
        dataTestId="show-detail"
      />
    );
    const labelElement = screen.getByText(/test label/i);
    const contentElement = screen.getByText(/test content/i);

    expect(labelElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test("renders with an array of contents", () => {
    const contentArray = ["Content 1", "Content 2"];
    render(
      <ShowDetail
        label="Test Label"
        content={contentArray}
        dataTestId="show-detail"
      />
    );
    const contentElement = screen.getByText(/content 1, content 2/i);

    expect(contentElement).toBeInTheDocument();
  });

  test("has the correct data-testid", () => {
    const { getByTestId } = render(
      <ShowDetail
        label="Test Label"
        content="Test Content"
        dataTestId="show-detail"
      />
    );
    const component = getByTestId("show-detail");

    expect(component).toBeInTheDocument();
  });
});
