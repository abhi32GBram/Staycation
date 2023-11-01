// Import types from the Prisma client, representing database entities.
import { Listing, Reservation, User } from "@prisma/client";

// Define a new type called SafeListing, which is a modified version of the Listing type.
export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string; // Add a field createdAt with a string type.
};

// Define a new type called SafeReservation, which is a modified version of the Reservation type.
export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string; // Add a field createdAt with a string type.
    startDate: string; // Add a field startDate with a string type.
    endDate: string; // Add a field endDate with a string type.
    listing: SafeListing; // Include the SafeListing type for the listing field.
};

// Define a new type called SafeUser, which is a modified version of the User type.
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string; // Add a field createdAt with a string type.
    updatedAt: string; // Add a field updatedAt with a string type.
    emailVerified: string | null; // Add a field emailVerified with a string or null type.
};
