import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function Q6():JSX.Element {
    const [userInfo, setUserInfo] = useState<string>("");
    function updateUserInfo(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserInfo(event.target.value);
    }
    return (
        <div>
            <Form.Group controlId="preferance">
            <Form.Label>Are you comfortable working in a fast-paced, high-stress environment or do you prefer a slower pace?</Form.Label>
            <Form.Control
            as="textarea"
            rows={5}
            value={userInfo}
            onChange={updateUserInfo} />
            </Form.Group>
        </div>
    );
}