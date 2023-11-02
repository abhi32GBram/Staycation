// Import required components and actions.
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

// Define the PropertiesPage component as an asynchronous function.
const PropertiesPage = async () => {
    // Fetch the current user data.
    const currentUser = await getCurrentUser();

    // Check if the user is not authenticated.
    if (!currentUser) {
        // Display an unauthorized state if the user is not logged in.
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        );
    }

    // Fetch the user's property listings.
    const listings = await getListings({ userId: currentUser.id });

    // Check if there are no property listings.
    if (listings.length === 0) {
        // Display a message indicating no properties are found.
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties."
                />
            </ClientOnly>
        );
    }

    // Render the PropertiesClient component with the retrieved data.
    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

// Export the PropertiesPage component as the default export.
export default PropertiesPage;
