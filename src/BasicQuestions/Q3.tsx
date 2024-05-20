import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q3(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[2] || "--");

  useEffect(() => {
    if (userAnswers[2]) {
      setData(userAnswers[2]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[2] = answer;
      return updatedAnswers;
    });
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
