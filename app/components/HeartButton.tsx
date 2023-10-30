import React from 'react'; // Import the 'React' module.
import { SafeUser } from '../types'; // Import the 'SafeUser' type from the '../types' module.
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import heart icons from 'react-icons/ai'.

// Define a set of props that the 'HeartButton' component can accept.
interface HeartButtonProps {
    listingId: string; // A unique identifier for the listing.
    currentUser: SafeUser | null; // The current user or null if not authenticated.
}

// Define the 'HeartButton' component as a functional React component.
const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, currentUser
}) => {

    const hasFavourited = false; // A boolean indicating whether the listing is favorited by the user.

    // Function to toggle the favorite status of the listing when clicked.
    const toggleFavourite = () => { }

    // Render the heart icon button, allowing users to favorite/unfavorite the listing.
    return (
        <div
            onClick={toggleFavourite} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={24} className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    );
}

export default HeartButton; // Export the 'HeartButton' component for use in other parts of the application.
