
// Import necessary modules and components.

// Import the 'Metadata' type from the 'next' package.
import type { Metadata } from 'next'

// Import the 'Nunito' font from the 'next/font/google' package.
import { Nunito } from 'next/font/google'

// Import the global styles from the 'globals.css' file.
import './globals.css'

// Import the 'Navbar' component from the 'Navbar' module.
import Navbar from './components/navbar/Navbar'

// Import the 'ClientOnly' component from the 'ClientOnly' module.
import ClientOnly from './components/ClientOnly'

// Import the 'RegisterModal' component from the 'modals/RegisterModal' module.
import RegisterModal from './components/modals/RegisterModal'

// Import the 'LoginModal' component from the 'components/modals/LoginModal' module.
import LoginModal from './components/modals/LoginModal'

// Import the 'ToasterProvider' for displaying toasts/messages.
import ToasterProvider from './providers/ToasterProvider'

// Import the 'getCurrentUser' function from './actions/getCurrentUser'.
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'

// Define metadata for the page.
export const metadata: Metadata = {
  title: 'Staycation', // Set the page title.
  description: 'Find unique and affordable accommodations for your next staycation', // Set the page description.
}

// Load the 'Nunito' font with the "latin" subset.
const font = Nunito({
  subsets: ["latin"]
})

// Define the RootLayout component to structure the page layout.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Retrieve the current user data by calling the 'getCurrentUser' function.
  const currentUser = await getCurrentUser()

  return (
    // Define the basic structure of the HTML document with the 'lang' attribute set to "en".
    <html lang="en">
      <body className={font.className}> {/* Apply the 'Nunito' font class to the body. */}
        <ClientOnly>
          <ToasterProvider /> {/* Provide a context for displaying toasts/messages. */}
          <RegisterModal /> {/* Render the registration modal. */}
          <RentModal />
          <LoginModal /> {/* Render the Login modal using Google or Github. */}
          <Navbar currentUser={currentUser} /> {/* Include the Navbar component for the page's navigation and pass the 'currentUser' data. */}
        </ClientOnly>
        {children} {/* Render the main content (children) of the page. */}
      </body>
    </html>
  )
}
