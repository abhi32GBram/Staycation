// Import required types
import { SafeListing, SafeUser } from "@/app/types";

// Import required components
import Heading from "@/app/components/Heading";
import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/ListingsCard";

// Define the properties that the FavoritesClient component accepts
interface FavoritesClientProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null,
}

// Define the FavoritesClient component as a functional React component
const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    // Render the FavoritesClient component
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you favorited!" />
            <div className="mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: any) => (
                    <ListingCard currentUser={currentUser!} key={listing.id} data={listing} />
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;
