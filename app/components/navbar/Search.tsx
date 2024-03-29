'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';

const Search = () => {
    // Initialize the search modal state.
    const searchModal = useSearchModal();

    // Get URL search parameters.
    const params = useSearchParams();

    // Initialize the useCountries hook.
    const { getByValue } = useCountries();

    // Extract search parameters from the URL.
    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    // Compute the location label based on the selected location value.
    const locationLabel = useMemo(() => {
        if (locationValue) {
            return (getByValue(locationValue as string)?.label || '');
        }

        return 'Anywhere';
    }, [locationValue, getByValue]);

    // Compute the duration label based on the selected start and end dates.
    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);

            if (diff === 0) {
                diff = 1;
            }

            return `${diff} Days`;
        }

        return 'Any Week';
    }, [startDate, endDate]);

    // Compute the guest label based on the selected guest count.
    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }

        return 'Add Guests';
    }, [guestCount]);

    return (
        <div
            onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm  font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm  pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{guestLabel}</div>
                    <div className="p-2 bg-purple-700 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
