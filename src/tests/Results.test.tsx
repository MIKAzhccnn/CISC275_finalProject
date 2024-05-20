import { render, screen } from "@testing-library/react";
import { ResultsPage } from "../views/Results";
import { Card } from "../components/interfaces";
import "@testing-library/jest-dom/extend-expect";

const mockCards: Card[] = [
  {
    title: "Software Engineer",
    info: "A career in software engineering involves developing and maintaining software systems.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Data Scientist",
    info: "A career in data science involves analyzing and interpreting complex data sets.",
    image: "https://via.placeholder.com/150",
  },
];

describe("ResultsPage Component tests", () => {
  test("renders the recommended careers title", () => {
    render(<ResultsPage cards={mockCards} />);
    expect(screen.getByText("Recommended Careers")).toBeInTheDocument();
  });

  test("renders the correct number of cards", () => {
    render(<ResultsPage cards={mockCards} />);
    const cards = screen.getAllByRole("img", { name: "" });
    expect(cards).toHaveLength(mockCards.length);
  });

  test("renders card titles", () => {
    render(<ResultsPage cards={mockCards} />);
    mockCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  test("renders card images", () => {
    render(<ResultsPage cards={mockCards} />);
    mockCards.forEach((card, index) => {
      const images = screen.getAllByRole("img", { name: "" });
      expect(images[index]).toHaveAttribute("src", card.image);
    });
  });
});
