// Import necessary modules and components.
'use client';
import Image from 'next/image';
import React from 'react';

// Define a functional component named Avatar.
const Avatar = () => {
    return (
        // Render an avatar image using the 'next/image' component.
        <Image
            className='rounded-full' // Apply rounded styling to make it circular.
            height='30'
            width='30'
            alt='Avatar'
            src='/images/placeholder.jpg' // Set the image source.
        />
    );
}

// Export the Avatar component as the default export of this module.
export default Avatar;
