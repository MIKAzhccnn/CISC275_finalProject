import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../views/Home";

// Mock the Footer component
jest.mock("../components/Footer", () => ({
  Footer: () => <div>Footer</div>,
}));

// Mock the Basic and Detail components
jest.mock("../views/Basic_Questions", () => ({
  __esModule: true,
  default: () => <div>Basic Questions Component</div>,
}));

jest.mock("../views/Detail_Questions", () => ({
  __esModule: true,
  default: () => <div>Detail Questions Component</div>,
}));

describe("Home Component tests", () => {
  test("renders Home page by default", () => {
    render(<Home />);
    expect(screen.getAllByText("FindYourCareer")[0]).toBeInTheDocument();
    expect(
      screen.getByText("UNIVERSITY OF DELAWARE STUDENTS"),
    ).toBeInTheDocument();
  });

  test("navigates to Basic Questions page", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Basic Quiz"));
    expect(screen.getByText("Basic Questions Component")).toBeInTheDocument();
  });

  test("navigates to Detailed Questions page", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Detailed Quiz"));
    expect(screen.getByText("Detail Questions Component")).toBeInTheDocument();
  });

  test("navigates back to Home page", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Basic Quiz"));
    fireEvent.click(screen.getByText("Home Page"));
    expect(screen.getAllByText("FindYourCareer")[0]).toBeInTheDocument();
    expect(
      screen.getByText("UNIVERSITY OF DELAWARE STUDENTS"),
    ).toBeInTheDocument();
  });
});
