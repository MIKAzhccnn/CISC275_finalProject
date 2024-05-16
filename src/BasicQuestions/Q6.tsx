import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q6(): JSX.Element {
  const [data, setData] = useState<string>("");
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);

  function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
    setData(event.target.value);
    setUserAnswers((prevAnswers: string[]) => {
      const answer = event.target.value;
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[5] = answer;
      return updatedAnswers;
    });
    console.log(userAnswers);
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <br></br>
        <h3>How do you handle challenges?</h3>
        <br></br>
        <Form.Select value={data} onChange={updateData}>
          <option value="--">--</option>
          <option value="By analyzing all possible solutions">
            By analyzing all possible solutions
          </option>
          <option value="By thinking creatively and outside the box">
            By thinking creatively and outside the box
          </option>
          <option value="By discussing and collaborating with others">
            By discussing and collaborating with others
          </option>
          <option value="By researching and experimenting">
            By researching and experimenting
          </option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}
