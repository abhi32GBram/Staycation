// Import required components
import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/ListingsCard";
import EmptyState from "@/app/components/EmptyState";

// Import required actions and types
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

// Define the properties that the Home component accepts
interface HomeProps {
  searchParams: IListingsParams
};

// Define the Home component as a functional React component
const Home = async ({ searchParams }: HomeProps) => {
  // Fetch the listings and current user
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // If no listings are found, return an empty state message
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  // If listings are found, return a grid of ListingCard components
  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
