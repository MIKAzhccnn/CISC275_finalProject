import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q4(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[3] || "--");

  useEffect(() => {
    if (userAnswers[3]) {
      setData(userAnswers[3]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[3] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userData">
        <h3 className="py-5">
          I find myself frequently setting priorities and creating schedules to
          effectively manage my time and tasks, ensuring that important
          deadlines are met.
        </h3>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
