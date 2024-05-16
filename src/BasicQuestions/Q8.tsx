import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

export function Q8():JSX.Element {
    const [data, setData] = useState<string>("");
    const { userAnswers, setUserAnswers } = useContext(AnswerContext);

    function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
        setData(event.target.value);
        setUserAnswers((prevAnswers: string[]) => {
            const answer = event.target.value;
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[7] = answer;
            return updatedAnswers;
          });
          console.log(userAnswers);
    }

    return (
        <div>
            <Form.Group controlId="userInput">
                <br></br>
                <h3>
                What motivates you to work hard?
                </h3>
                <br></br>
                <Form.Select value={data} onChange={updateData}>
                    <option value="--">--</option>
                    <option value="Achieving success and recognition">Achieving success and recognition</option>
                    <option value="Expressing creativity and originality">Expressing creativity and originality</option>
                    <option value="Making a positive impact on others">Making a positive impact on others</option>
                    <option value="Solving complex problems and challenges">Solving complex problems and challenges</option>
                </Form.Select>
            </Form.Group>
        </div>
    );
}