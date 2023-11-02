// Import required modules and components.
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Define the properties that the DELETE function accepts.
interface IParams {
    reservationId?: string;
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

    // Get the reservationId from the parameters.
    const { reservationId } = params;

    // Validate the reservationId.
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Delete the reservation that matches the given reservationId and user ID.

    // Use Prisma to delete reservations based on certain conditions.
    const reservation = await prisma.reservation.deleteMany({
        // Define the conditions for deletion.
        where: {
            // Condition 1: Delete reservations with the specified reservationId.
            id: reservationId,

            // Condition 2: Delete reservations where the userId matches the current user's ID.
            // This allows the current user to delete their own reservations.
            OR: [
                { userId: currentUser.id },

                // Condition 3: Delete reservations associated with a listing owned by the current user.
                // This allows the current user to delete reservations for listings they own.
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    // The 'reservation' variable may contain information about the deleted reservations.

    // Return a JSON response with the deleted reservation.
    return NextResponse.json(reservation);
}
