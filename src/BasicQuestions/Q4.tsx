import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const saveInfo = "BasicUserInputQ4";

export function Q4():JSX.Element {
    const [data, setData] = useState<string>("");

    function updateData(event: React.ChangeEvent<HTMLSelectElement>) {
        setData(event.target.value);
    }

    useEffect(() => {
        localStorage.setItem(saveInfo, JSON.stringify(data));
      }, [data]);

    return (
        <div>
            <Form.Group controlId="userData">
                <Form.Label>I find myself frequently setting priorities and creating schedules to effectively manage my time and tasks, ensuring that important deadlines are met.</Form.Label>
                <br></br>
                <Form.Select value={data} onChange={updateData}>
                    <option value="--">--</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Form.Select>
            </Form.Group>
        </div>
    );
}