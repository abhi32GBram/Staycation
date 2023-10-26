// Import necessary modules and components.
'use client'
import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

// Define the props interface for the 'Counter' component.
interface CounterProps {
    title: string        // Title displayed for the counter.
    subtitle: string     // Subtitle or description for the counter.
    value: number        // Current value of the counter.
    onChange: (value: number) => void  // Callback function to handle value changes.
}

const Counter: React.FC<CounterProps> = ({
    title, subtitle, value, onChange
}) => {
    // Define a callback function for increasing the counter value.
    const onAdd = useCallback(
        () => {
            onChange(value + 1)
        },
        [onChange, value]
    )

    // Define a callback function for reducing the counter value.
    const onReduce = useCallback(
        () => {
            onChange(value - 1)
        },
        [value, onChange]
    )

    return (
        <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col '>
                <div className='font-medium'>
                    {title}  {/* Display the title. */}
                </div>
                <div className='font-light font-gray-600'>
                    {subtitle}  {/* Display the subtitle. */}
                </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <div onClick={onReduce}
                    className='
                    w-10 
                    h-10 
                    rounded-full 
                    border-[1px] 
                    border-neutral-400 
                    flex items-center 
                    justify-center 
                    text-neutral-600 
                    cursor-pointer 
                    hover:opacity-80 
                    transition'>
                    <AiOutlineMinus />  {/* Display the minus icon and bind the 'onReduce' function. */}
                </div>
                <div className='font-light text-xl text-neutral-600'>
                    {value}  {/* Display the current value. */}
                </div>
                <div onClick={onAdd}
                    className='
                    w-10 
                    h-10 
                    rounded-full 
                    border-[1px] 
                    border-neutral-400 
                    flex items-center 
                    justify-center 
                    text-neutral-600 
                    cursor-pointer 
                    hover:opacity-80 
                    transition'>
                    <AiOutlinePlus />  {/* Display the plus icon and bind the 'onAdd' function. */}
                </div>
            </div>
        </div>
    )
}

export default Counter
