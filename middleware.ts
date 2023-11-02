// Import the default export from the "next-auth/middleware" module.
export { default } from "next-auth/middleware";

// Configuration object for the middleware.
export const config = {
    // Define an array of URL patterns that should be protected by authentication.
    matcher: [
        "/trips", // Protect the "/trips" route.
        "/reservations", // Protect the "/reservations" route.
        "/properties", // Protect the "/properties" route.
        "/favorites" // Protect the "/favorites" route.
    ]
};


// This code exports authentication middleware from the "next-auth" library and configures it to protect specific routes, such as "/trips," "/reservations," "/properties," and "/favorites."