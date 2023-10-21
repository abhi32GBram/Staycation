'use client';

// Import React and necessary hooks from the 'react' library.
import React, { useState, useEffect } from 'react';

// Define an interface for the 'ClientOnly' component's props.
interface ClientOnlyProps {
    children: React.ReactNode; // A property 'children' of type React.ReactNode for the component's content.
}

// Define a functional component named 'ClientOnly'.
const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    // Create a state variable 'hasMounted' to track whether the component has mounted.
    const [hasMounted, setHasMounted] = useState(false);

    // Use the 'useEffect' hook to update 'hasMounted' to 'true' after component mounting.
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // If the component has not yet mounted, return null (don't render anything).
    if (!hasMounted) return null;

    // If the component has mounted, render its children.
    return (
        <>
            {children}
        </>
    );
};

// Export the 'ClientOnly' component as the default export of this module.
export default ClientOnly;

// ClientOnly is a React functional component designed to conditionally render its children. It waits until the component has mounted (i.e., it's been added to the DOM) before rendering its children. This is often used for client-side rendering when you want to avoid rendering certain components on the server side.

// The ClientOnly component takes a single prop, children, which represents the content or components you want to conditionally render.

// Inside the component, it uses the useState and useEffect hooks to track whether the component has mounted. The useEffect hook sets hasMounted to true after the component has mounted.

// If the component hasn't mounted yet (i.e., hasMounted is false), it returns null, effectively preventing the rendering of its children.

// Once the component has mounted (i.e., hasMounted is true), it renders its children, which are wrapped in a React.Fragment (<>...</>`). This allows you to conditionally render content on the client side, making it useful for scenarios where server-side rendering (SSR) might not be desired or necessary.