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
        <h3 className="py-5">Do you have any short-term or long-term goals?</h3>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="short-term">Short-Term</option>
          <option value="long-term">Long-Term</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
