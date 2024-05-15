import "../Results.css";
import { Card } from "../components/interfaces";

interface ResultsPageProps {
  cards: Card[];
}
export function ResultsPage({ cards }: ResultsPageProps): JSX.Element {
  //above is an example
  return (
    <div className="containerx" style={{ position: "fixed", top: "200px" }}>
      <div
        style={{ position: "fixed", top: "70px", padding: "none" }}
        className="text-center"
      >
        <h1 style={{ fontSize: "50px", color: "black" }}>
          Recommended Careers
        </h1>
      </div>
      {cards.map((card: Card) => (
        <div className="card">
          <img className="background" src={card.image} alt="" />
          <div className="card-content">
            <div className="profile-image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <h3 className="title">{card.title}</h3>
          </div>
          <div className="backdrop"></div>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
