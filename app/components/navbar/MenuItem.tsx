'use client'
import React from 'react'

// Define an interface named MenuItemProps.
interface MenuItemProps {
    onClick: () => void // A function 'onClick' that will be triggered when the menu item is clicked.
    label: string // A string 'label' to display the text of the menu item.
}

// Define a functional component named MenuItem, which takes 'onClick' and 'label' as props.
const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    return (
        // Render a clickable menu item as a <div> element with styling.
        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold' onClick={onClick}>
            {label} {/* Display the 'label' text within the menu item. */}
        </div>
    )
}

// Export the MenuItem component as the default export of this module.
export default MenuItem
