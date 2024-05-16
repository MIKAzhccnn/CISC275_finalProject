import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Ensure the correct import path

export function Q5(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [userInfo, setUserInfo] = useState<string>(userAnswers[5] || ""); // Initialize with context state

  useEffect(() => {
    // Update context when userInfo changes
    setUserAnswers([...userAnswers.slice(0, 5), userInfo]);
  }, [userInfo, setUserAnswers, userAnswers]);

  function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="preference">
        <h3>Do you prefer working independently or as part of a team?</h3>
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
