import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Verify the correct import path

export function Q4(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [userInfo, setUserInfo] = useState<string>(userAnswers[4] || ""); // Adjusted to use string only, defaulting to an empty string

  useEffect(() => {
    setUserAnswers([...userAnswers.slice(0, 4), userInfo]);
  }, [userInfo, setUserAnswers, userAnswers]);

  function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
            <br></br>
            <h3>
              What skills do you possess and enjoy using?
            </h3>
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
