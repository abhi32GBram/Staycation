'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Define the properties that the DatePicker component accepts.
interface DatePickerProps {
    value: Range; // Date range value.
    onChange: (value: RangeKeyDict) => void; // Function to handle date range changes.
    disabledDates?: Date[]; // Array of disabled dates.
}

// Define the DatePicker component as a functional React component.
const DatePicker: React.FC<DatePickerProps> = ({
    value, // Date range value.
    onChange, // Function to handle date range changes.
    disabledDates // Array of disabled dates.
}) => {
    return (
        <DateRange
            rangeColors={['#262626']} // Set the range color.
            ranges={[value]} // Set the date range.
            date={new Date()} // Default date.
            onChange={onChange} // Handle date range changes.
            direction="vertical" // Vertical direction for the calendar.
            showDateDisplay={false} // Disable date display.
            minDate={new Date()} // Set the minimum date to the current date.
            disabledDates={disabledDates} // Set disabled dates.
        />
    );
}

export default DatePicker;
