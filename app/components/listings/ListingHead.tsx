'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

// Define the interface for the properties that the ListingHead component accepts.
interface ListingHeadProps {
    title: string; // The title of the listing.
    locationValue: string; // The location value of the listing.
    imageSrc: string; // The source URL for the listing image.
    id: string; // The unique identifier for the listing.
    currentUser?: SafeUser | null; // The current user or null if not authenticated.
}

// Define the ListingHead component as a functional React component.
const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    // Get a country by its value using the useCountries hook.
    const { getByValue } = useCountries();

    // Get the location information for the listing.
    const location = getByValue(locationValue);

    return (
        <>
            {/* Render the Heading component with the listing title and location. */}
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            {/* Create a container for the listing image with a HeartButton. */}
            <div className="
                w-full
                h-[60vh]
                overflow-hidden 
                rounded-xl
                relative
            ">
                {/* Display the listing image using the next/image component. */}
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                />
                {/* Position the HeartButton in the top-right corner of the image. */}
                <div
                    className="
                        absolute
                        top-5
                        right-5
                    "
                >
                    {/* Render the HeartButton component for favoriting the listing. */}
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser!}
                    />
                </div>
            </div>
        </>
    );
}

export default ListingHead;
