import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { AnswerContext } from "../AnswerContext";

const places = [
    "Corporate Office",
    "Startup",
    "Non-profit Organization",
    "Goverment Agency",
    "Bank"
];

export function Q3():JSX.Element {
    const [selectPlace, setSelectPlace] = useState<string | null>(null);
    const { userAnswers, setUserAnswers } = useContext(AnswerContext);
    
    function updatePlace(event: React.ChangeEvent<HTMLInputElement>){
        setSelectPlace(event.target.value)
        
    }
    return (
        <div>
            <br></br>
            <br></br>
            Which of the following work environments would you thrive in the most?
            <br></br>
            <br></br>
            <br></br>
            {places.map((place) => (
                <Form.Check
                    inline
                    type="checkbox"
                    label={place}
                    name="place-button"
                    checked={selectPlace === place}
                    onChange={()=>setSelectPlace(place)}
                />
            ))}
        </div>
    );
}
