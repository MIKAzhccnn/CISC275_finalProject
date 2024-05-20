import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q1(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[0] || "--");

  useEffect(() => {
    if (userAnswers[0]) {
      setData(userAnswers[0]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[0] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <h3 className="py-5">Which activity do you enjoy the most?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="Solving puzzles and analyzing data">
            Solving puzzles and analyzing data
          </option>
          <option value="Creating art or designs">
            Creating art or designs
          </option>
          <option value="Caring for animals">Caring for animals</option>
          <option value="Conducting experiments">Conducting experiments</option>
          <option value="Leading and organizing groups">
            Leading and organizing groups
          </option>
          <option value="Writing and storytelling">
            Writing and storytelling
          </option>
          <option value="Helping and counseling people">
            Helping and counseling people
          </option>
          <option value="Programming and coding">Programming and coding</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
