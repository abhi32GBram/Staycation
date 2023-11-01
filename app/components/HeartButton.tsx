'use client'
import React from 'react'; // Import the 'React' module.
import { SafeUser } from '../types'; // Import the 'SafeUser' type from the '../types' module.
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import heart icons from 'react-icons/ai'.
import useFavorite from '../hooks/useFavourite';

interface HeartButtonProps {
    listingId: string;
    currentUser: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
    const { hasFavourited, toggleFavourite } = useFavorite({
        listingId,
        currentUser,
    });

    return (
        <div
            onClick={toggleFavourite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart
                size={24}
                className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'}
            />
        </div>
    );
}

export default HeartButton;
