import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerObj = ({ initialDate }) => {
    console.log(initialDate)
    const [startDate, setStartDate] = useState(initialDate ? new Date(initialDate) : null)
    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
}

export default DatePickerObj