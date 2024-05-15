import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

const skills = [
    "attention to detail",
    "creativity",
    "analytical thinking",
    "leadership",
    "communication"
];

export function Q4():JSX.Element {
    const [selectSkill, setSelectSkill] = useState<string | null>(null);
    const { userAnswers, setUserAnswers } = useContext(AnswerContext);
    function updateSkill(event: React.ChangeEvent<HTMLInputElement>){
        setSelectSkill(event.target.value)
        
    }
    return (
        <div>
            <br></br>
            <br></br>
            Which of the following skills do you possess and enjoy using?
            <br></br>
            <br></br>
            <br></br>
            {skills.map((skill) => (
                <Form.Check
                    inline
                    type="checkbox"
                    label={skill}
                    name="skill-button"
                    checked={selectSkill === skill}
                    onChange={()=>setSelectSkill(skill)}
                />
            ))}
        </div>
    );
}
