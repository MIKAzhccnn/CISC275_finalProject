import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q4(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[3] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
  }

  return (
    <div>
      <Form.Group controlId="userData">
        <h3 className="py-5">
          {" "}
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
