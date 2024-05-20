import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q6(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[5] || "--");

  useEffect(() => {
    if (userAnswers[5]) {
      setData(userAnswers[5]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[5] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <br></br>
        <h3>How do you handle challenges?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="By analyzing all possible solutions">
            By analyzing all possible solutions
          </option>
          <option value="By thinking creatively and outside the box">
            By thinking creatively and outside the box
          </option>
          <option value="By discussing and collaborating with others">
            By discussing and collaborating with others
          </option>
          <option value="By researching and experimenting">
            By researching and experimenting
          </option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
