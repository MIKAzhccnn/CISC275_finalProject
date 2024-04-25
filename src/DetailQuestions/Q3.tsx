import React, { useState } from "react";
import { Form } from "react-bootstrap";

const places = [
    "Corporate Office",
    "Startup",
    "Non-profit Organization",
    "Goverment Agency",
    "Bank"
];

export function Q3():JSX.Element {
    const [selectPlace, setSelectPlace] = useState(places[0]);

    return (
        <div>
            Which of the following work environments would you thrive in the most?
            {places.map((place) => (
                <Form.Check
                    type="radio"
                    label={place}
                    name="place-button"
                    checked={selectPlace === place}
                    onChange={() => setSelectPlace(place)}
                />
            ))}
        </div>
    );
}