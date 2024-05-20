import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Basic_Questions from "../views/Basic_Questions";
import { AnswerContext } from "../AnswerContext";
import "jest-location-mock";
import "@testing-library/jest-dom/extend-expect";

// Mock components to simplify testing
jest.mock("../BasicQuestions/Q1", () => ({
  Q1: () => <div>Q1 Component</div>,
}));
jest.mock("../BasicQuestions/Q2", () => ({
  Q2: () => <div>Q2 Component</div>,
}));
jest.mock("../BasicQuestions/Q3", () => ({
  Q3: () => <div>Q3 Component</div>,
}));
jest.mock("../BasicQuestions/Q4", () => ({
  Q4: () => <div>Q4 Component</div>,
}));
jest.mock("../BasicQuestions/Q5", () => ({
  Q5: () => <div>Q5 Component</div>,
}));
jest.mock("../BasicQuestions/Q6", () => ({
  Q6: () => <div>Q6 Component</div>,
}));
jest.mock("../BasicQuestions/Q7", () => ({
  Q7: () => <div>Q7 Component</div>,
}));
jest.mock("../BasicQuestions/Q8", () => ({
  Q8: () => <div>Q8 Component</div>,
}));
jest.mock("../components/Feedback", () => ({
  Complete: () => <div>Feedback Component</div>,
}));
jest.mock("../components/OpenAIOverlay", () => ({
  OpenAIOverlay: () => <div>OpenAIOverlay Component</div>,
}));
jest.mock("../components/Loader", () => ({
  Loader: () => <div>Loader Component</div>,
}));
jest.mock("../views/Results", () => ({
  ResultsPage: () => <div>ResultsPage Component</div>,
}));

describe("Basic_Questions Component tests", () => {
  const renderWithContext = (component: JSX.Element) => {
    return render(
      <AnswerContext.Provider
        value={{ userAnswers: Array(8).fill(""), setUserAnswers: jest.fn() }}
      >
        {component}
      </AnswerContext.Provider>,
    );
  };

  test("renders the first question", () => {
    renderWithContext(<Basic_Questions />);
    expect(screen.getByText("Q1 Component")).toBeInTheDocument();
  });

  test("shows alert when trying to proceed without answering", () => {
    window.alert = jest.fn();
    renderWithContext(<Basic_Questions />);
    fireEvent.click(screen.getByAltText("Next"));
    expect(window.alert).toHaveBeenCalledWith(
      "Please answer the question before proceeding.",
    );
  });

  test("disables previous button on the first question", () => {
    renderWithContext(<Basic_Questions />);
    const prevButton = screen.getByAltText("Prev").closest("button");
    expect(prevButton).toBeDisabled();
  });
});
