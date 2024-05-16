import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q2(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[1] || "");

  useEffect(() => {
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[1] = data;
      return updatedAnswers;
    });
  }, [data, setUserAnswers]);

  function updateData(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="work-schedule">
        <h3 className="py-5">What is your ideal working schedule?</h3>
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
