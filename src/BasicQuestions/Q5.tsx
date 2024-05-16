import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q5(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[4] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
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
          <option value="physic">Physic</option>
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
