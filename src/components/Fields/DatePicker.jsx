import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerField = ({ input: { name, value, onChange }, disablePast, disableFuture, disabled }) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(value ? dayjs(value) : null);
    }, [value]);

    const handleChange = (newValue) => {
        setDate(newValue);
        onChange(newValue ? newValue.toISOString() : null); // store as ISO
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name={name}
                value={date}
                onChange={handleChange}
                disabled={disabled}
                disablePast={disablePast}
                disableFuture={disableFuture}
                format="DD/MM/YYYY"
            />
        </LocalizationProvider>
    );
};

export default DatePickerField;
