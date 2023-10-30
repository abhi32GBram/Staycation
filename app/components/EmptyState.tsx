'use client';

import { useRouter } from "next/navigation"; // Import the 'useRouter' hook from the 'next/navigation' module.
import Button from "./Button"; // Import the 'Button' component.
import Heading from "./Heading"; // Import the 'Heading' component.

// Define a set of props that the 'EmptyState' component can accept.
interface EmptyStateProps {
  title?: string; // Optional title property, defaults to "No exact matches".
  subtitle?: string; // Optional subtitle property, defaults to "Try changing or removing some of your filters."
  showReset?: boolean; // Optional boolean property to control whether to show the "Remove all filters" button.
}

// Define the 'EmptyState' component as a functional React component.
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches", // Set the title default value.
  subtitle = "Try changing or removing some of your filters.", // Set the subtitle default value.
  showReset // The 'showReset' prop to determine if the "Remove all filters" button should be displayed.
}) => {
  const router = useRouter(); // Initialize the 'router' using the 'useRouter' hook.

  // Render the component's content.
  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title} // Display the provided title.
        subtitle={subtitle} // Display the provided subtitle.
      />
      <div className="w-48 mt-4">
        {showReset && ( // Render the "Remove all filters" button if 'showReset' is true.
          <Button
            outline
            label="Remove all filters" // Button label.
            onClick={() => router.push('/')} // Handle click event to navigate to the main page.
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState; // Export the 'EmptyState' component for use in other parts of the application.
