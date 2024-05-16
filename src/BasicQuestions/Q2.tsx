import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q2(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[1] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
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
