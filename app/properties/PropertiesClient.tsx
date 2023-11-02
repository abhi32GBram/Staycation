'use client'
// Import required modules and components.
import { toast } from "react-hot-toast";

import axios from "axios";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/ListingsCard";

import { SafeListing, SafeUser } from "@/app/types";

// Define the properties that the PropertiesClient component accepts.
interface PropertiesClientProps {
    listings: SafeListing[]; // List of property listings.
    currentUser?: SafeUser | null; // Current user data (optional).
}

// Define the PropertiesClient component as a functional React component.
const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings, // List of property listings.
    currentUser // Current user data (optional).
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    // Define the onDelete callback function to handle property deletion.
    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        // Send a request to delete the property listing by ID.
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                // Show a success toast message.
                toast.success('Listing deleted');
                // Refresh the page.
                router.refresh();
            })
            .catch((error) => {
                // Show an error toast message with details if the deletion fails.
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: any) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser!}
                    />
                ))}
            </div>
        </Container>
    );
};

// Export the PropertiesClient component as the default export.
export default PropertiesClient;
