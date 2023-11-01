'use client'
import React, { useMemo } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListings, SafeUser } from '@/app/types';

import { Listing, Reservation } from '@prisma/client';

import useCountries from '@/app/hooks/useCountries';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

/**
 * Props for the ListingsCard component.
 */
interface ListingsCardProps {
    data: SafeListings;            // Listing data to display.
    reservation?: Reservation; // Reservation data, if applicable.
    onAction?: (id: string) => void;  // Callback function for user actions.
    disabled?: boolean;       // Flag indicating if the component is disabled.
    actionLabel?: string;     // Label for the action button.
    actionId?: string;        // ID for the action.
    currentUser: SafeUser | null; // The current user (ensured not to be undefined).
}

/**
 * Component for displaying a listing card.
 */
const ListingsCard: React.FC<ListingsCardProps> = ({
    data, reservation, onAction, disabled, actionLabel,
    actionId = '',
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    /**
     * Handle the action button click event.
      //@param e - The click event.
     */
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    // Calculate the price to display, considering reservations.
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    // Calculate the reservation date range.
    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')} `;
    }, [reservation]);

    return (
        <div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
                </div>
                <div className="font-semibold text-ld">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-bold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            Night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
                )}
            </div>
        </div>
    );
};

export default ListingsCard;
