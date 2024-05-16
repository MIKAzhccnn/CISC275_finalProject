import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q1(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLInputElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[0] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <h3 className="py-5">What do you like to do in your free time?</h3>

        <Form.Control type="textbox" value={data} onChange={updateData} />
      </Form.Group>
    </div>
  );
}
