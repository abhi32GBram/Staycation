// Import necessary modules and components.
'use client'
import { on } from 'events' // It seems like 'on' is imported but not used, and 'events' is not imported.

import React from 'react'
import { IconType } from 'react-icons'

// Define the props interface for the 'CategoryInput' component.
interface CategoryInputProps {
    icon: IconType // The type for the icon, which should be an IconType from 'react-icons'.
    label: string // The label for the category input.
    selected?: boolean // An optional boolean flag indicating if the category is selected.
    onClick: (value: string) => void // A function to handle the click event on the category input.
}

// Define the 'CategoryInput' functional component.
const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon, // Destructure the 'icon' prop and rename it to 'Icon'.
    label, // Destructure the 'label' prop.
    selected, // Destructure the 'selected' prop.
    onClick // Destructure the 'onClick' prop.
}) => {
    return (
        // Render a div element representing the category input.
        <div onClick={() => onClick(label)} className={`
            rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
            ${selected ? 'border-black ' : 'border-neutral-200'}`} // Apply conditional styling based on 'selected'.
        >
            <Icon size={30} /> {/* Render the provided icon with a size of 30. */}
            <div className='font-'>
                {label} {/* Display the label text for the category. */}
            </div>
        </div>
    )
}

// Export the 'CategoryInput' component as the default export of this module.
export default CategoryInput
