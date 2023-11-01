import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

// Define an interface for the parameters the ListingPage function receives.
interface IParams {
    listingId?: string; // A unique identifier for the listing.
}

// Define the ListingPage function as an asynchronous component.
const ListingPage = async ({ params }: { params: IParams }) => {
    // Fetch the listing, reservations, and current user asynchronously.
    const listing = await getListingById(params); // Get a listing by its ID.
    const reservations = await getReservations(params); // Get reservations associated with the listing.
    const currentUser = await getCurrentUser(); // Get the current user.

    // If no listing is found, display an EmptyState component.
    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    // Render the ListingClient component with the fetched data.
    return (
        <ClientOnly>
            <ListingClient
                listing={listing} // Pass the listing data.
                reservations={reservations} // Pass the reservations data.
                currentUser={currentUser} // Pass the current user data.
            />
        </ClientOnly>
    );
}

export default ListingPage;
