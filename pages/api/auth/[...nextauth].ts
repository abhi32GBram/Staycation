import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'

import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    // Set up the authentication adapter using Prisma for data storage.
    adapter: PrismaAdapter(prisma),

    // Configure authentication providers, such as GitHub, Google, and custom credentials.
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            // Set up a custom "credentials" provider for email and password authentication.
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                // Authorize function is called when a user tries to sign in with credentials.

                // Check if email and password are provided; if not, throw an error.
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                // Query the Prisma database to find a user with the provided email.
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // If the user or their hashed password isn't found, throw an error.
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // Compare the provided password with the hashed password in the database.
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                // If the password is incorrect, throw an error.
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                // If all checks pass, return the user, allowing them to sign in.
                return user;
            }
        })
    ],

    // Define authentication pages, like the sign-in page.
    pages: {
        signIn: '/',
    },

    // Enable debugging during development.
    debug: process.env.NODE_ENV === 'development',

    // Configure user sessions using JSON Web Tokens (JWT).
    session: {
        strategy: "jwt",
    },

    // Use a secret to secure user sessions and authentication.
    secret: process.env.NEXTAUTH_SECRET,
}

// Export the authentication configuration using NextAuth.
export default NextAuth(authOptions);
