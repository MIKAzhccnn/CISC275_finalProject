import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q7(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[6] || "--");

  useEffect(() => {
    if (userAnswers[6]) {
      setData(userAnswers[6]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[6] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <br></br>
        <h3>Which aspect of a project excites you the most?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="Setting and achieving goals">
            Setting and achieving goals
          </option>
          <option value="Conceptualizing and designing">
            Conceptualizing and designing
          </option>
          <option value="Interacting and networking with people">
            Interacting and networking with people
          </option>
          <option value="Testing and troubleshooting">
            Testing and troubleshooting
          </option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
