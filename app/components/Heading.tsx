// Import React to define a React component.
'use client';
import React from 'react';

// Define the properties (props) that the Heading component can receive.
interface HeadingProps {
    title: string;      // A required title string.
    subtitle?: string;  // An optional subtitle string.
    center?: boolean;   // An optional boolean flag to center-align the content.
}

// Define the Heading component as a functional component.
const Heading: React.FC<HeadingProps> = ({
    title, subtitle, center
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            {/* Render the title with a larger, bold font. */}
            <div className='text-2xl font-bold'>
                {title}
            </div>
            {/* Render the subtitle with a lighter font and a top margin. */}
            <div className='font-light text-neutral-500 mt-2'>
                {subtitle}
            </div>
        </div>
    );
}

// Export the Heading component as the default export of this module.
export default Heading;
