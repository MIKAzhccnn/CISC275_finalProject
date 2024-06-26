import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q8(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[7] || "--");

  useEffect(() => {
    if (userAnswers[7]) {
      setData(userAnswers[7]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[7] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <br></br>
        <h3>What motivates you to work hard?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="Achieving success and recognition">
            Achieving success and recognition
          </option>
          <option value="Expressing creativity and originality">
            Expressing creativity and originality
          </option>
          <option value="Making a positive impact on others">
            Making a positive impact on others
          </option>
          <option value="Solving complex problems and challenges">
            Solving complex problems and challenges
          </option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
