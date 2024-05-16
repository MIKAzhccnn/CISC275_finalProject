import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q3(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[2] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
  }

  return (
    <div>
      <Form.Group controlId="userData">
        <h3 className="py-5">
          What is the highest education you have completed?
        </h3>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="middleSchool">Middle School</option>
          <option value="highSchool">High School</option>
          <option value="associate">Associate Degree</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="doctor">Doctoral Degree</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
