import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Verify the correct import path

export function Q4(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [data, setData] = useState<string>(userAnswers[3] || "");

  useEffect(() => {
    setUserAnswers((prevAnswers: string[]) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[3] = data;
      return updatedAnswers;
    });
  }, [data, setUserAnswers]);

  function updateData(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
        <h3 className="py-5">What skills do you possess and enjoy using?</h3>
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
