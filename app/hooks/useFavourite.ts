// Importing necessary libraries and modules
import axios from 'axios' // Axios for making HTTP requests
import { useRouter } from 'next/navigation' // Next.js router for handling routing
import { useCallback, useEffect, useState } from 'react' // React hooks for managing state and side effects

import { toast } from 'react-hot-toast' // Hot toast for displaying toast notifications

import { SafeUser } from '../types' // Type for the user

import useLoginModal from './useLoginModal' // Custom hook for handling login modal

// Interface for the useFavorite hook
interface IUseFavourite {
    listingId: string // ID of the listing
    currentUser?: SafeUser | null // Current user
}

// useFavorite hook
const useFavorite = ({ listingId, currentUser }: IUseFavourite) => {
    const router = useRouter() // Initialize router
    const loginModal = useLoginModal() // Initialize login modal
    const [hasFavourited, setHasFavourited] = useState(false); // Initialize hasFavourited state

    // useEffect hook to update hasFavourited state when currentUser or listingId changes
    useEffect(() => {
        const list = currentUser?.favouriteIds || []; // Get list of current user's favourites
        setHasFavourited(list.includes(listingId)); // Update hasFavourited state based on whether listingId is in the list
    }, [currentUser, listingId]);

    // toggleFavourite function to handle adding and removing favourites
    const toggleFavourite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation() // Stop event propagation
            if (!currentUser) { // If there is no current user
                return loginModal.onOpen() // Open login modal
            }

            try {
                let request // Initialize request
                if (hasFavourited) { // If the listing is already a favourite
                    request = () => axios.delete(`/api/favourites/${listingId}`) // Make a DELETE request to remove the listing from the favourites
                } else { // If the listing is not a favourite
                    request = () => axios.post(`/api/favourites/${listingId}`) // Make a POST request to add the listing to the favourites
                }
                await request() // Execute the request
                setHasFavourited(prevHasFavourited => !prevHasFavourited); // Update hasFavourited state based on the previous state
                toast.success('Added to Favourites') // Display a success toast notification
            } catch (error) { // If an error occurs
                toast.error('Something Went Wrong') // Display an error toast notification
            }
        },
        [currentUser, listingId, hasFavourited, loginModal] // Dependencies for the useCallback hook
    )
    return { // Return the hasFavourited state and toggleFavourite function
        hasFavourited,
        toggleFavourite,
    }
}

export default useFavorite // Export the useFavorite hook
