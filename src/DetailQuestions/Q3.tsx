import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

const places = [
  "Corporate Office",
  "Startup",
  "Non-profit Organization",
  "Government Agency",
  "Bank",
];

export function Q3(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [selectPlace, setSelectPlace] = useState<string>(userAnswers[3] || ""); // Adjusted to default to an empty string

  useEffect(() => {
    setUserAnswers([...userAnswers.slice(0, 3), selectPlace]);
  }, [selectPlace, setUserAnswers, userAnswers]);

  function handlePlaceChange(place: string) {
    setSelectPlace(place);
  }

  return (
    <div>
      <h3>
        Which of the following work environments would you thrive in the most?
      </h3>
      {places.map((place) => (
        <Form.Check
          key={place}
          type="radio"
          label={place}
          name="place-button"
          checked={selectPlace === place}
          onChange={() => handlePlaceChange(place)}
        />
      ))}
    </div>
  );
}
