'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

// Dynamically import the Map component (client-side only).
const Map = dynamic(() => import('../Map'), {
    ssr: false
});

// Define the properties that the ListingInfo component accepts.
interface ListingInfoProps {
    user: SafeUser; // User information.
    description: string; // Description of the listing.
    guestCount: number; // Number of guests.
    roomCount: number; // Number of rooms.
    bathroomCount: number; // Number of bathrooms.
    category: {
        icon: IconType; // Icon for the category.
        label: string; // Label for the category.
        description: string; // Description of the category.
    } | undefined;
    locationValue: string; // Location value.
}

// Define the ListingInfo component as a functional React component.
const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
}) => {
    // Get location coordinates based on location value.
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="
                    text-xl 
                    font-semibold 
                    flex 
                    flex-row 
                    items-center
                    gap-2
                ">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    font-light
                    text-neutral-500
                ">
                    <div>
                        {guestCount} Guests
                    </div>
                    <div>
                        {roomCount} Rooms
                    </div>
                    <div>
                        {bathroomCount} Bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            {/* Render the Map component with specified center coordinates. */}
            <Map center={coordinates} />
        </div>
    );
}

export default ListingInfo;
