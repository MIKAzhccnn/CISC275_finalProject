import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q3(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[2] || "");

  useEffect(() => {
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[2] = data;
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
          What kind of work environments would you thrive in the most?
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
