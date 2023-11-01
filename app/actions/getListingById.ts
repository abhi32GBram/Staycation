import prisma from "@/app/libs/prismadb";

// Define an interface for the parameters the function receives.
interface IParams {
    listingId?: string; // A unique identifier for the listing.
}

// Define and export an asynchronous function to get a listing by its ID.
export default async function getListingById(
    params: IParams // Accepts the parameters defined in the IParams interface.
) {
    try {
        const { listingId } = params; // Destructure the listingId from the parameters.

        // Use Prisma to find a unique listing with the provided ID, including the associated user.
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId, // Specify the ID to search for.
            },
            include: {
                user: true, // Include the user associated with the listing.
            }
        });

        // If no listing is found, return null.
        if (!listing) {
            return null;
        }

        // Return the listing with modified fields, ensuring they are in string format.
        return {
            ...listing,
            createdAt: listing.createdAt.toString(), // Convert createdAt to a string.
            user: {
                ...listing.user, // Include user details.
                createdAt: listing.user.createdAt.toString(), // Convert user's createdAt to a string.
                updatedAt: listing.user.updatedAt.toString(), // Convert user's updatedAt to a string.
                emailVerified:
                    listing.user.emailVerified?.toString() || null, // Convert emailVerified to a string or null if it's undefined.
            }
        };
    } catch (error: any) {
        // If an error occurs during the database query, throw an error.
        throw new Error(error);
    }
}
