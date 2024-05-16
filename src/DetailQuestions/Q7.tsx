import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Ensure the correct import path

export function Q7(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[6] || "");

  useEffect(() => {
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[6] = data;
      return updatedAnswers;
    });
  }, [data, setUserAnswers]);

  function updateData(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
        <h3 className="py-5">How do you feel about traveling for work?</h3>
        <Form.Control
          as="textarea"
          rows={3}
          value={data}
          onChange={updateData}
        />
      </Form.Group>
    </div>
  );
}
