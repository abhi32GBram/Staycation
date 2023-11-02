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


// Define the properties that the ReservationsClient component accepts.
interface ReservationsClientProps {
    reservations: SafeReservation[]; // An array of reservations for display.
    currentUser?: SafeUser | null; // The current user, which can be null if not authenticated.
}

// Define the ReservationsClient component as a functional React component.
const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    // Define the onCancel function to cancel a reservation.
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        // Send a request to cancel the reservation.
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh(); // Refresh the page after cancellation.
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
            {/* Render the heading for the Reservations page. */}
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
                {reservations.map((reservation: any) => (
                    // Render a ListingCard for each reservation.
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser!}
                    />
                ))}
            </div>
        </Container>
    );
};

// Export the ReservationsClient component.
export default ReservationsClient;
