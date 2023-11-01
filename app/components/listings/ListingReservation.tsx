'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

// Define the properties that the ListingReservation component accepts.
interface ListingReservationProps {
  price: number; // Price per night.
  dateRange: Range; // Date range for reservation.
  totalPrice: number; // Total reservation cost.
  onChangeDate: (value: Range) => void; // Function to handle date range changes.
  onSubmit: () => void; // Function to submit the reservation.
  disabled?: boolean; // Flag indicating if the reservation is disabled.
  disabledDates: Date[]; // Array of disabled dates.
}

// Define the ListingReservation component as a functional React component.
const ListingReservation: React.FC<ListingReservationProps> = ({
  price, // Price per night.
  dateRange, // Date range for reservation.
  totalPrice, // Total reservation cost.
  onChangeDate, // Function to handle date range changes.
  onSubmit, // Function to submit the reservation.
  disabled, // Flag indicating if the reservation is disabled.
  disabledDates // Array of disabled dates.
}) => {
  return (
    <div
      className="
        bg-white 
        rounded-xl 
        border-[1px] 
        border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
        flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          ₹ {price} {/* Display the price per night. */}
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit} // Handle reservation submission.
        />
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          ₹ {totalPrice} {/* Display the total reservation cost. */}
        </div>
      </div>
    </div>
  );
}

export default ListingReservation;
