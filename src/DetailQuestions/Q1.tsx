import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q1(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const reasons = [
    "Salary",
    "Work-life balance",
    "Helping others",
    "Others Reasons",
  ];

  const [selectReason, setSelectReason] = useState<string>(
    userAnswers[0] || "",
  );
  const [userInfo, setUserInfo] = useState<string>(userAnswers[1] || "");

  useEffect(() => {
    setUserAnswers([selectReason, userInfo]);
  }, [selectReason, userInfo, setUserAnswers]);

  function updateSelectReason(reason: string) {
    setSelectReason(reason);
  }

  function updateUserInfo(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInfo(event.target.value);
  }

  return (
    <div>
            <h3>What is most important to you in a job?</h3>
            <br></br>
            <br></br>
            <br></br>
            {reasons.map((reason) => (
                <Form.Check
                    inline
                    type="checkbox"
                    label={reason}
                    name="reason-button"
                    checked={selectReason === reason}
                    onChange={() => updateSelectReason(reason)}
                />
            ))}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            if "Others" OR have anything to share, please indicate here:
            <br></br>
            <br></br>
            <Form.Control
                        type="textbox"
                        value={userInfo}
                        onChange={updateUserInfo}
                    />
        </div>
  );
}
