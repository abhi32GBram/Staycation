// Import the necessary modules and components.
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'

// Define an asynchronous function 'getSession' to get the user session.
export async function getSession() {
    try {
        // Get the server session using the provided 'authOptions'.
        const session = await getServerSession(authOptions);

        return session; // Return the session data.
    } catch (error) {
        return null; // Handle any errors and return null if there's an issue.
    }
}

// Define an asynchronous function 'getCurrentUser' to retrieve the current user.
export default async function getCurrentUser() {
    try {
        // Get the user session using the 'getSession' function.
        const session = await getSession();

        // Check if there's no session or no user email in the session data.
        if (!session?.user?.email) {
            return null; // Return null if the user is not authenticated.
        }

        // Find the current user in the database based on the email from the session.
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        // Check if the user doesn't exist in the database.
        if (!currentUser) {
            return null; // Return null if the user doesn't exist.
        }

        return {
            ...currentUser,
        createdAt : currentUser.createdAt.toISOString(),
        updatedAt : currentUser.updatedAt.toISOString(),
        emailVerified : currentUser.emailVerified?.toISOString() || null }; // Return the current user if found.
    } catch (error: any) {
        return null; // Handle any errors and return null in case of an error.
    }
}

// 2 21 