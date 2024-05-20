import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext"; // Make sure the path is correct

export function Q1(): JSX.Element {
  const { userAnswers, setUserAnswers } = useContext(AnswerContext);
  const reasons = [
    "Salary",
    "Work-life balance",
    "Helping others",
    "Other Reasons",
  ];

  const [data, setData] = useState<string>(userAnswers[0] || "");
  const [selectedReason, setSelectedReason] = useState<string>(
    userAnswers[0] || "",
  );

  useEffect(() => {
    setUserAnswers([selectedReason, data]);
  }, [selectedReason, data, setUserAnswers]);

  function updateReason(reason: string) {
    setSelectedReason(reason);
  }

  function updateData(event: React.ChangeEvent<HTMLInputElement>) {
    setData(event.target.value);
  }

  return (
    <div>
      <Form.Group controlId="userInput">
        <h3 className="py-5">What is most important to you in a job?</h3>
        {reasons.map((reason) => (
          <Form.Check
            key={reason}
            inline
            type="checkbox"
            label={reason}
            name="reason-button"
            checked={selectedReason === reason}
            onChange={() => updateReason(reason)}
          />
        ))}
        <br />
        <br />
        <p>
          If "Other Reasons" or if you have anything to share, please indicate
          here:
        </p>
        <Form.Control type="textbox" value={data} onChange={updateData} />
      </Form.Group>
    </div>
  );
}
