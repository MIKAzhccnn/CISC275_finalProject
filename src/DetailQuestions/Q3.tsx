import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q3(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [userInfo, setUserInfo] = useState<string>(userAnswers[3] || ""); // Adjusted to default to an empty string

  useEffect(() => {
    setUserAnswers([...userAnswers.slice(0, 3), userInfo]);
  }, [userInfo, setUserAnswers, userAnswers]);

  function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
            <br></br>
            <br></br>
            <h3>
              Which of the following work environments would you thrive in the most?
            </h3>
            <br></br>
            <br></br>
            <br></br>
            <Form.Control
              as="textarea"
              rows={5}
              value={userInfo}
              onChange={updateUserInfo}
            />
        </Form.Group>
        </div>
  );
}
