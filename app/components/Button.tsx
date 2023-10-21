'use client';

// Import the 'IconType' type from 'react-icons'.
import { IconType } from "react-icons";

// Define an interface for the 'Button' component's props.
interface ButtonProps {
    label: string; // A string representing the label of the button.
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // A function to handle button clicks.
    disabled?: boolean; // An optional boolean indicating whether the button is disabled.
    outline?: boolean; // An optional boolean indicating whether the button has an outline style.
    small?: boolean; // An optional boolean indicating whether the button is small in size.
    icon?: IconType; // An optional icon to display alongside the button label.
}

// Define a functional component named 'Button' that receives the defined props.
const Button: React.FC<ButtonProps> = ({
    label, onClick, disabled, outline, small,
    icon: Icon,
}) => {
    return (
        <button
            // Set the 'disabled' property based on the 'disabled' prop.
            disabled={disabled}
            // Set the 'onClick' property to the provided click handler.
            onClick={onClick}
            className={`
                relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
                ${outline ? 'bg-white' : 'bg-purple-700'}
                ${outline ? 'border-black' : 'border-purple-700'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {Icon && (
                // Render the provided icon if it exists.
                <Icon size={24} className="absolute left-4 top-3" />
            )}
            {label} {/* Display the button label. */}
        </button>
    );
}

// Export the 'Button' component as the default export of this module.
export default Button;
