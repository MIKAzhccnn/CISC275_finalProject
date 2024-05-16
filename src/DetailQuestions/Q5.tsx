import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Ensure the correct import path

export function Q5(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[4] || "");

  useEffect(() => {
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[4] = data;
      return updatedAnswers;
    });
  }, [data, setUserAnswers]);

  function updateData(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
        <h3 className="py-5">
          Do you prefer working independently or as part of a team?
        </h3>
        <Form.Control
          as="textarea"
          rows={5}
          value={data}
          onChange={updateData}
        />
      </Form.Group>
    </div>
  );
}
