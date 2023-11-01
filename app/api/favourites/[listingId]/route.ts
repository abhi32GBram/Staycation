import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

// Define the expected parameters for the requests.
interface Iparams {
    listingId?: string;
}

// Handler for the POST request to add a listing to user's favorites.
export async function POST(
    request: Request,
    { params }: { params: Iparams }
) {
    // Fetch the current user.
    const currentUser = await getCurrentUser();

    // Check if the user is not authenticated or has no favoriteIds.
    if (!currentUser || !currentUser.favouriteIds) {
        return NextResponse.error();
    }

    // Extract the listingId from the request parameters.
    const { listingId } = params;

    // Check if the listingId is invalid.
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Create a new array of favoriteIds based on the user's current favorites.
    const favouriteIds = [...currentUser.favouriteIds];

    // Update the user's favoriteIds in the database.
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favouriteIds
        }
    });

    // Respond with the updated user data.
    return NextResponse.json(user);
}

// Handler for the DELETE request to remove a listing from user's favorites.
export async function DELETE(
    req: Request,
    { params }: { params: Iparams }
) {
    // Fetch the current user.
    const currentUser = await getCurrentUser();

    // Check if the user is not authenticated or has no favoriteIds.
    if (!currentUser || !currentUser.favouriteIds) {
        return NextResponse.error();
    }

    // Extract the listingId from the request parameters.
    const { listingId } = params;

    // Check if the listingId is invalid.
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Filter the favoriteIds to remove the specified listingId.
    const favouriteIds = currentUser.favouriteIds.filter((id) => id !== listingId);

    // Update the user's favoriteIds in the database.
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favouriteIds
        }
    });

    // Respond with the updated user data.
    return NextResponse.json(user);
}
