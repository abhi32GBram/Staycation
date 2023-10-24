// Import necessary modules and components.
'use client';
import Image from 'next/image';
import React from 'react';

interface AvatarProps{
    src : string | null | undefined
}
// Define a functional component named Avatar.
const Avatar : React.FC<AvatarProps> = ({
    src
}) => {
    return (
        // Render an avatar image using the 'next/image' component.
        <Image
            className='rounded-full' // Apply rounded styling to make it circular.
            height='30'
            width='30'
            alt='Avatar'
            src={src || "/images/placeholder.jpg"} // Set the image source.
        />
    );
}

// Export the Avatar component as the default export of this module.
export default Avatar;
