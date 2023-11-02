// Import required components and actions.
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavouriteListings";

import FavouritesClient from "./FavouritesClient";

// Define the ListingPage component as an asynchronous function.
const ListingPage = async () => {
    // Fetch the user's favorite listings and current user data.
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    // Check if there are no favorite listings.
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        );
    }

    // Render the FavoritesClient component with the retrieved data.
    return (
        <ClientOnly>
            <FavouritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

// Export the ListingPage component as the default export.
export default ListingPage;
