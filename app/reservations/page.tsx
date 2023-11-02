// Import required modules and components.
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import ReservationsClient from "./ReservationsClient";

// Define the ReservationsPage component as an asynchronous function.
const ReservationsPage = async () => {
    // Get the current user.
    const currentUser = await getCurrentUser();

    // Check if the user is authenticated.
    if (!currentUser) {
        // Return an Unauthorized message if the user is not authenticated.
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    // Get reservations for the current user.
    const reservations = await getReservations({ authorId: currentUser.id });

    // Check if there are no reservations for the current user.
    if (reservations.length === 0) {
        // Return a message indicating that no reservations are found.
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties."
                />
            </ClientOnly>
        );
    }

    // Render the ReservationsClient component with reservations and the current user.
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

// Export the ReservationsPage component.
export default ReservationsPage;
