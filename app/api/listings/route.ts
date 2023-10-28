import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    // Get the current user using the 'getCurrentUser' function.
    const currentUser = await getCurrentUser();

    // If no current user is found, return an error response.
    if (!currentUser) {
        return NextResponse.error();
    }

    // Parse the request body as JSON.
    const body = await request.json();

    // Destructure relevant data from the request body.
    const {
        title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price
    } = body;

    // Note: The following code appears to be commented out and does not affect the logic.
    // It seems to check if any property in the 'body' object is truthy, but it's not clear why.
    // Object.keys(body).forEach((value: any) => {
    //     if (body[value]) {
    //         NextResponse.error();
    //     }
    // })

    // Create a new listing using the 'prisma' database client.
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10), // Parse 'price' as an integer with base 10.
            userId: currentUser.id
        }
    });

    // Return a JSON response with the created listing.
    return NextResponse.json(listing);
}
