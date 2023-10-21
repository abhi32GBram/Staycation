'use client'
import React from 'react'

// Define an interface named ContainerProps.
interface ContainerProps {
    children: React.ReactNode // A property 'children' of type React.ReactNode for the container component.
}

// Define a functional component named Container, which takes 'children' as a prop.
const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
        // Render a container <div> element with responsive width and padding.
        <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 '>
            {children} // Render the child components or elements inside the container.
        </div>
    )
}

// Export the Container component as the default export of this module.
export default Container
