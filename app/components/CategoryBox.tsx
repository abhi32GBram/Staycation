// Import necessary modules and components.
'use client';

import qs from 'query-string';  // Import the 'query-string' library to handle URL query parameters.
import { useRouter, useSearchParams } from "next/navigation";  // Import routing and search parameters from Next.js.
import { useCallback } from "react";  // Import 'useCallback' hook for optimizing event handlers.
import { IconType } from "react-icons";  // Import the 'IconType' type from 'react-icons' for category icons.

// Define the props interface for the 'CategoryBox' component.
interface CategoryBoxProps {
    icon: IconType; // The icon for the category.
    label: string; // The label or name of the category.
    selected?: boolean; // An optional flag to indicate if the category is selected.
}

// Define a functional component named 'CategoryBox'.
const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
}) => {
    // Access the Next.js router to manage URL navigation.
    const router = useRouter();

    // Access the current URL search parameters (query parameters).
    const params = useSearchParams();

    // Define a callback function 'handleClick' to handle category selection.
    const handleClick = useCallback(() => {
        let currentQuery = {};

        // Check if search parameters exist and parse them into an object.
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        // Create an updated query object by adding or modifying the 'category' parameter.
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        // If the category is already selected, remove the 'category' parameter.
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        // Generate a new URL with the updated query using 'qs.stringifyUrl'.
        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery
            },
            { skipNull: true }
        );

        // Navigate to the new URL by pushing it to the router.
        router.push(url);
    }, [label, router, params]);

    return (
        <div
            onClick={handleClick} // Trigger the 'handleClick' function when the category box is clicked.
            className={`
                flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon size={26} /> {/* Display the category icon. */}
            <div className="font-medium text-sm">
                {label} {/* Display the category label. */}
            </div>
        </div>
    );
}

export default CategoryBox;
