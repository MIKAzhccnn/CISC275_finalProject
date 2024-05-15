import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

const reasons = [
    "Salary",
    "Work-life balance",
    "Helping others",
    "Others Reasons",
];

export function Q1():JSX.Element {
    const [selectReason, setSelectReason] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<string>("");
    const { userAnswers, setUserAnswers } = useContext(AnswerContext);

    function updateReson(event: React.ChangeEvent<HTMLInputElement>){
        setSelectReason(event.target.value)

    }

    function updateUserInfo(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(event.target.value);
        
    }

    return (
        <div>
            What is most important to you in a job?
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
                    onChange={()=>setSelectReason(reason)}
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
