import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    // Parse the JSON body from the incoming HTTP request.
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    // Hash the user's password for security using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the Prisma database with the provided data.
    const user = await prisma.user.create({
        data: {
            email,            // User's email
            name,             // User's name
            hashedPassword,   // Securely hashed password
        }
    });

    // Respond with a JSON response containing the created user data.
    return NextResponse.json(user);
}
