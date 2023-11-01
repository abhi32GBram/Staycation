import prisma from '@/app/libs/prismadb';

/**
 * Fetch a list of listings from the database.
 *
 * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
 * @throws {Error} If an error occurs during the database query.
 */
export default async function getListings() {
    try {
        // Use Prisma to find and retrieve a list of listings from the database.
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc', // Order the listings by creation date in descending order.
            },
        });

        // Convert the 'createdAt' property to ISO string for safe serialization.
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        // Return the retrieved listings.
        return safeListings;
    } catch (error: any) {
        // If an error occurs during the database query, throw an error.
        throw new Error(error);
    }
}
