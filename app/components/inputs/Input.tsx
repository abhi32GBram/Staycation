// Import necessary modules and components.
'use client';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FaRupeeSign } from 'react-icons/fa';

// Define the properties (props) that the Input component can receive.
interface InputProps {
    id: string;         // A unique ID for the input field.
    label: string;      // The label for the input field.
    type?: string;      // An optional type for the input (default is "text").
    disabled?: boolean; // An optional flag to disable the input.
    formatPrice?: boolean; // An optional flag to format the input as a price.
    required?: boolean; // An optional flag to indicate if the input is required.
    register: UseFormRegister<FieldValues>; // The function to register the input with React Hook Form.
    errors: FieldErrors; // Any validation errors associated with the input.
}

// Define the Input component as a functional component.
const Input: React.FC<InputProps> = ({
    id, label, type = "text", disabled, formatPrice, required, register, errors
}) => {
    return (
        <div className='w-full relative'>
            {formatPrice && (
                // Render the Rupee Sign icon if 'formatPrice' is true.
                <FaRupeeSign size={24} className='text-neutral-700 absolute top-5 left-2' />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=' '
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'border-rose-700' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-700' : 'focus:border-black'}`}
            ></input>
            <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                    ${formatPrice ? 'left-9' : 'left-4'} 
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}>
                {label}
            </label>
        </div>
    );
}

// Export the Input component as the default export of this module.
export default Input;
