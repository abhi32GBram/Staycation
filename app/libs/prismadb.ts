import { PrismaClient } from "@prisma/client";

// Declare a global variable "prisma" with the PrismaClient type or undefined.
declare global {
    var prisma: PrismaClient | undefined;
}

// Create a Prisma client instance named "client."
const client = globalThis.prisma || new PrismaClient();

// If the environment is not "production," assign the Prisma client to the global "prisma" variable.
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

// Export the Prisma client for use in other parts of the application.
export default client;
