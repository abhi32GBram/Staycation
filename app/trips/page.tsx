// Import components and actions used in the TripsPage component.
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

// Import the TripsClient component for rendering trips.
import TripsClient from "./TripsClient";

// Define the TripsPage component as an asynchronous function.
const TripsPage = async () => {
    // Retrieve the current user information.
    const currentUser = await getCurrentUser();

    // Check if there is no current user (user is not logged in).
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    // Fetch reservations for the current user.
    const reservations = await getReservations({ userId: currentUser.id });

    // Check if there are no reservations for the user.
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you haven't reserved any trips."
                />
            </ClientOnly>
        );
    }

    // Render the TripsClient component with reservations and user information.
    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

// Export the TripsPage component.
export default TripsPage;
