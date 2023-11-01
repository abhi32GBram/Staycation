'use client'
// Import required modules and components.
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/ListingsCard";

// Define the properties that the TripsClient component accepts.
interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

// Define the TripsClient component as a functional React component.
const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    // Initialize the router and deletingId state.
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    // Define a callback function to cancel a reservation.
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    // Render the TripsClient component.
    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser!}
                    />
                ))}
            </div>
        </Container>
    );
}

// Export the TripsClient component.
export default TripsClient;
