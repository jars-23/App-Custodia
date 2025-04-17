import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { parseISO } from 'date-fns';

function DatePickerComponent({ label = "Seleccionar fecha", value, onChange }) {

    const [internalValue, setInternalValue] = useState(null)

    useEffect(() => {
        if (value) {
            setInternalValue(typeof value === 'string' ? parseISO(value) : value);
        } else {
            setInternalValue(null); 
        }
    }, [value]);

    const handleDateChange = (newDate) => {
        onChange(newDate || null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
            <DatePicker
                label={label}
                value={value}
                onChange={handleDateChange}
                slots={{
                    textField: (params) => (
                        <TextField
                            {...params}
                        />
                    ),
                }}
            />
        </LocalizationProvider>
    );
}

export default DatePickerComponent;
