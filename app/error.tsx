'use client'
import { useEffect } from "react"; // Import the useEffect hook from React.
import EmptyState from "@/app/components/EmptyState"; // Import the EmptyState component.

// Define the ErrorStateProps interface for the ErrorState component.
interface ErrorStateProps {
    error: Error; // Error object.
}

// Define the ErrorState component as a functional React component.
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    useEffect(() => {
        console.error(error); // Log the error to the console when the component is mounted.
    }, [error]);

    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!"
        />
    );
}

export default ErrorState; // Export the ErrorState component.
