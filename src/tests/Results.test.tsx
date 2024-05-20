import { render, screen } from "@testing-library/react";
import { ResultsPage } from "../views/Results";
import { Card } from "../components/interfaces";

// Mock the bootstrap components
jest.mock("react-bootstrap/OverlayTrigger", () => ({ children }: any) => (
  <>{children}</>
));
jest.mock("react-bootstrap/Tooltip", () => ({ children }: any) => (
  <>{children}</>
));

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
    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(mockCards.length);
  });

  test("renders card titles and info in tooltips", () => {
    render(<ResultsPage cards={mockCards} />);
    mockCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.info)).toBeInTheDocument();
    });
  });

  test("renders card images", () => {
    render(<ResultsPage cards={mockCards} />);
    mockCards.forEach((card) => {
      expect(screen.getByAltText("")).toHaveAttribute("src", card.image);
    });
  });
});
