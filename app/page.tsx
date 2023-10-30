// Import the 'getCurrentUser' function from the specified module.
// 'getCurrentUser' is used to fetch information about the current user.
import getCurrentUser from "@/app/actions/getCurrentUser";

// Import the 'getListings' function from the specified module.
// 'getListings' is used to fetch a list of available listings.
import getListings from "./actions/getListings";

// Import various components needed for rendering the home page.
import ClientOnly from "./components/ClientOnly"; // Provides client-only rendering.
import EmptyState from "./components/EmptyState"; // Component for displaying when no listings are available.
import Container from "./components/container"; // Container component for layout.
import ListingsCard from "./components/listings/ListingsCard"; // Component for displaying listing cards.

// Define the main function for the home page.
export default async function Home() {
  // Fetch a list of available listings and store them in the 'listings' variable.
  const listings = await getListings();

  // Fetch information about the current user and store it in the 'currentUser' variable.
  const currentUser = await getCurrentUser();

  // Check if there is only one listing available.
  if (listings.length === 1) {
    // If there is only one listing, display the 'EmptyState' component with an option to reset filters.
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  // If there are multiple listings, render the listings in a grid layout.
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-2 gap-8">
          {listings.map((listing: any) => (
            // Render 'ListingsCard' components for each listing, passing in the 'currentUser' and 'data' props.
            <ListingsCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
