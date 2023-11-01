import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    // Get the current user using the getCurrentUser function.
    const currentUser = await getCurrentUser();

    // If there's no current user, return an error response.
    if (!currentUser) {
        return NextResponse.error();
    }

    // Parse the JSON body of the request.
    const body = await request.json();

    // Extract the required data from the request body.
    const { listingId, startDate, endDate, totalPrice } = body;

    // Check if any of the required data is missing, and return an error response if any is missing.
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    // Update the listing and create a new reservation for the user.
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    // Return a JSON response with the updated listing and reservation data.
    return NextResponse.json(listingAndReservation);
}
