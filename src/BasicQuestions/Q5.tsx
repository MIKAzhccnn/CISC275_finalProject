import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q5(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[4] || "--");

  useEffect(() => {
    if (userAnswers[4]) {
      setData(userAnswers[4]);
    }
  }, [userAnswers]);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    const answer = event.target.value;
    setData(answer);
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[4] = answer;
      return updatedAnswers;
    });
  }

  return (
    <div>
      <Form.Group controlId="userData">
        <h3 className="py-5">
          What is your favorite subject when you are at school?
        </h3>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="english">English</option>
          <option value="history">History</option>
          <option value="math">Math</option>
          <option value="art">Art</option>
          <option value="physics">Physics</option>
          <option value="biology">Biology</option>
          <option value="chemistry">Chemistry</option>
          <option value="music">Music</option>
          <option value="foreign-language">Foreign-Language</option>
          <option value="health">Health</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
