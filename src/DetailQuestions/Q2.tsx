import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q2():JSX.Element {
    const [userInfo, setUserInfo] = useState<string>("");
    const { userAnswers, setUserAnswers } = useContext(AnswerContext);
    function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserInfo(event.target.value);
        setUserAnswers((prevAnswers: string[]) => {
            const answer = event.target.value;
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[10] = answer;
            return updatedAnswers;
          });
          console.log(userAnswers);
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
