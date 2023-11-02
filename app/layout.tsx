// Import the Nunito font from Google Fonts to use in the application.
import { Nunito } from 'next/font/google';

// Import React components and modules.
import Navbar from '@/app/components/navbar/Navbar'; // The application's navigation bar.
import LoginModal from '@/app/components/modals/LoginModal'; // Modal for user login.
import RegisterModal from '@/app/components/modals/RegisterModal'; // Modal for user registration.
import SearchModal from '@/app/components/modals/SearchModal'; // Modal for search filters.
import RentModal from '@/app/components/modals/RentModal'; // Modal for renting properties.

import ToasterProvider from '@/app/providers/ToasterProvider'; // Provider for displaying toasts.

import './globals.css'; // Global CSS styles for the application.
import ClientOnly from './components/ClientOnly'; // Component for client-only rendering.
import getCurrentUser from './actions/getCurrentUser'; // Function to get the current user.

// Metadata for the application.
export const metadata = {
  title: 'Staycation',
  description: 'Find unique and affordable accommodations for your next staycation', // Set the page description.
};

// Define the Nunito font with the 'latin' subset.
const font = Nunito({
  subsets: ['latin'],
});

// Define the RootLayout component, which is the root layout for the application.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current user asynchronously.
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider /> {/* Provides toast notifications for the application. */}
          <LoginModal /> {/* Modal for user login. */}
          <RegisterModal /> {/* Modal for user registration. */}
          <SearchModal /> {/* Modal for search filters. */}
          <RentModal /> {/* Modal for renting properties. */}
          <Navbar currentUser={currentUser} /> {/* Navigation bar with user information. */}
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div> {/* Render the child components. */}
      </body>
    </html>
  );
}
