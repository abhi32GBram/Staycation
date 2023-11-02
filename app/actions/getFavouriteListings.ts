// Import Prisma client
import prisma from "@/app/libs/prismadb";

// Import getCurrentUser function
import getCurrentUser from "./getCurrentUser";

// Define getFavoriteListings function
export default async function getFavoriteListings() {
    try {
        // Fetch the current user
        const currentUser = await getCurrentUser();

        // If no current user, return an empty array
        if (!currentUser) {
            return [];
        }

        // Fetch favorite listings from the database using Prisma
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        });

        // Map over the favorite listings and convert the createdAt date to a string
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toString(),
        }));

        // Return the favorite listings
        return safeFavorites;
    } catch (error: any) {
        // If an error occurs, throw an error
        throw new Error(error);
    }
}
