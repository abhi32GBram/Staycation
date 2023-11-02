// Import Prisma client
import prisma from "@/app/libs/prismadb";

// Define the parameters for the getListings function
export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

// Define the getListings function
export default async function getListings(
    params: IListingsParams
) {
    try {
        // Destructure the parameters
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        // Initialize the query object
        let query: any = {};

        // Add userId to the query if it exists
        if (userId) {
            query.userId = userId;
        }

        // Add category to the query if it exists
        if (category) {
            query.category = category;
        }

        // Add roomCount to the query if it exists
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        // Add guestCount to the query if it exists
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        // Add bathroomCount to the query if it exists
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        // Add locationValue to the query if it exists
        if (locationValue) {
            query.locationValue = locationValue;
        }

        // Add date range to the query if both startDate and endDate exist
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        // Fetch the listings from the database using Prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map over the listings and convert the createdAt date to a string
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        // Return the listings
        return safeListings;
    } catch (error: any) {
        // If an error occurs, throw an error
        throw new Error(error);
    }
}
