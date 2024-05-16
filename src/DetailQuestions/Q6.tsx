import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Ensure the correct import path

export function Q6(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [userInfo, setUserInfo] = useState<string>(userAnswers[6] || ""); // Initialize with the value from context

  useEffect(() => {
    // Update context when userInfo changes
    setUserAnswers([...userAnswers.slice(0, 6), userInfo]);
  }, [userInfo, setUserAnswers, userAnswers]);

  function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
        <h3>
          Are you comfortable working in a fast-paced, high-stress environment
          or do you prefer a slower pace?
        </h3>
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
