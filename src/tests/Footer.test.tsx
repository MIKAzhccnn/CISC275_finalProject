import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "../components/Footer";
import "jest-location-mock";

describe("Footer Component tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the OpenAI API Key input", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText(/Insert API Key Here/i);
    expect(input).toBeInTheDocument();
  });

  test("changes key input value", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText(/Insert API Key Here/i);
    fireEvent.change(input, { target: { value: "new-api-key" } });
    expect(input).toHaveValue("new-api-key");
  });

  test("submits and stores the key in localStorage", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText(/Insert API Key Here/i);
    fireEvent.change(input, { target: { value: "new-api-key" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    expect(localStorage.getItem("USER_OAKEY")).toBe(
      JSON.stringify("new-api-key"),
    );
  });

  test("reloads the page on submit", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText(/Insert API Key Here/i);
    fireEvent.change(input, { target: { value: "new-api-key" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
