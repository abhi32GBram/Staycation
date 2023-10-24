// Import the User type from the Prisma client, which represents a user object.
import { User } from "@prisma/client";

// Define a new type called SafeUser, which is a modified version of the User type.
export type SafeUser = Omit<
    User, // Create SafeUser based on the User type.
    "createdAt" | "updatedAt" | "emailVerified" // Omit these fields from the User type.
> & {
    createdAt: string // Add a field createdAt with a string type.
    updatedAt: string // Add a field updatedAt with a string type.
    emailVerified: string | null // Add a field emailVerified with a string or null type.
}
