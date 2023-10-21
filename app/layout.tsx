// Import the 'Metadata' type from the 'next' package.
import type { Metadata } from 'next'

// Import the 'Nunito' font from the 'next/font/google' package.
import { Nunito } from 'next/font/google'

// Import the 'globals.css' file to apply global styles.
import './globals.css'

// Import the 'Navbar' component from the 'Navbar' module.
import Navbar from './components/navbar/Navbar'

// Define metadata for the page.
export const metadata: Metadata = {
  title: 'Staycation',
  description: 'Find unique and affordable accommodations for your next staycation',
}

// Load the 'Nunito' font with the "latin" subset.
const font = Nunito({
  subsets: ["latin"]
})

// Define the RootLayout component to structure the page layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Define the basic structure of the HTML document with the 'lang' attribute set to "en".
    <html lang="en">
      <body className={font.className}> {/* Apply the 'Nunito' font class to the body. */}
        <Navbar /> {/* Include the Navbar component for the page's navigation. */}
        {children} {/* Render the main content (children) of the page. */}
      </body>
    </html>
  )
}
