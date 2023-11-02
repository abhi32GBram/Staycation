// Import required modules and components.
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Define the properties that the DELETE function accepts.
interface IParams {
    listingId?: string; // ID of the listing to delete.
}

// Define the DELETE function.
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // Get the current user.
    const currentUser = await getCurrentUser();

    // Check if the user is authenticated.
    if (!currentUser) {
        return NextResponse.error();
    }

    // Get the listingId from the parameters.
    const { listingId } = params;

    // Validate the listingId.
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Delete the listing that matches the given listingId and user ID.
    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    // Return a JSON response with the deleted listing.
    return NextResponse.json(listing);
}


// This code defines a serverless API endpoint for deleting a listing.
// It first checks if the user is authenticated, validates the listing ID, and then deletes the listing if the user has the required permissions.
// The result is returned as a JSON response.