import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q2(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const [userInfo, setUserInfo] = useState<string>(userAnswers[2] || ""); // Assuming the third index for this answer

  useEffect(() => {
    setUserAnswers([...userAnswers.slice(0, 2), userInfo]);
  }, [userInfo, setUserAnswers, userAnswers]);

  function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
            <Form.Group controlId="work-schedule">
            <br></br>
            
            <Form.Label>What is your ideal working schedule?</Form.Label>
            <br></br>
            <br></br>
            <br></br>
            <Form.Control
            as="textarea"
            rows={5}
            value={userInfo}
            onChange={updateUserInfo} />
            </Form.Group>
        </div>
  );
}
