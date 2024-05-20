import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q2(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[1] || "--");

  useEffect(() => {
    if (userAnswers[1]) {
      setData(userAnswers[1]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[1] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <br></br>
        <h3>Which of these statements best describes you?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="I am detail-oriented and precise">
            I am detail-oriented and precise
          </option>
          <option value="I am imaginative and original">
            I am imaginative and original
          </option>
          <option value="I am empathetic and compassionate">
            I am empathetic and compassionate
          </option>
          <option value="I am logical and methodical">
            I am logical and methodical
          </option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
