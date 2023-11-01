'use client';

import { IconType } from "react-icons";

// Define the properties that the CategoryView component accepts.
interface CategoryViewProps {
    icon: IconType; // Icon for the category.
    label: string; // Label for the category.
    description: string; // Description of the category.
}

// Define the CategoryView component as a functional React component.
const CategoryView: React.FC<CategoryViewProps> = ({
    icon: Icon, // Destructure the icon and rename it as 'Icon'.
    label, // Label for the category.
    description // Description of the category.
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                {/* Render the category icon with specified size and style. */}
                <Icon size={40} className="text-neutral-600" />
                <div className="flex flex-col">
                    <div
                        className="text-lg font-semibold"
                    >
                        {label} {/* Display the label. */}
                    </div>
                    <div
                        className="text-neutral-500 font-light"
                    >
                        {description} {/* Display the description. */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryView;
