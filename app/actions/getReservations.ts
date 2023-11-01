import prisma from "@/app/libs/prismadb";

// Define the parameters that the getReservations function accepts.
interface IParams {
    listingId?: string; // Listing ID for filtering reservations.
    userId?: string; // User ID for filtering reservations.
    authorId?: string; // Author (user) ID for filtering reservations.
}

// Define the getReservations function as an asynchronous function.
export default async function getReservations(params: IParams) {
    try {
        // Extract the parameters from the input object.
        const { listingId, userId, authorId } = params;

        // Create an empty query object for filtering reservations.
        const query: any = {};

        // Check if a listing ID is provided and add it to the query.
        if (listingId) {
            query.listingId = listingId;
        }

        // Check if a user ID is provided and add it to the query.
        if (userId) {
            query.userId = userId;
        }

        // Check if an author ID is provided and filter reservations by the author's ID.
        if (authorId) {
            query.listing = { userId: authorId };
        }

        // Use Prisma to find and retrieve a list of reservations from the database.
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true, // Include the associated listing for each reservation.
            },
            orderBy: {
                createdAt: 'desc', // Order the reservations by creation date in descending order.
            },
        });

        // Transform the reservations data into a safe format with ISO date strings.
        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            },
        }));

        // Return the safe reservations data.
        return safeReservations;
    } catch (error: any) {
        // If an error occurs during the database query, throw an error.
        throw new Error(error);
    }
}
