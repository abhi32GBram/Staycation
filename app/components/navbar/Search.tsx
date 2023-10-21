'use client';

// Import the BiSearch icon from the 'react-icons/bi' package.
import { BiSearch } from 'react-icons/bi';

// Define a functional component named Search.
const Search = () => {
    return (
        // Render a search component with styling.
        <div className="border-[1px]  w-full  md:w-auto  py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className=" flex flex-row items-center justify-between">
                {/* Display the text "Anywhere" with specific styling. */}
                <div className="text-sm  font-semibold px-6">
                    Anywhere
                </div>

                {/* Display the text "Any Week" (hidden on small screens) with specific styling. */}
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    Any Week
                </div>

                {/* Create a search input field with a search button. */}
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    {/* Display the text "Any Desk" (hidden on small screens) with specific styling. */}
                    <div className="hidden sm:block">
                        Add Guests
                    </div>

                    {/* Display a search button with a purple background and a search icon. */}
                    <div className="p-2 bg-purple-700 rounded-full text-white">
                        <BiSearch size={18} /> {/* Render the search icon from react-icons/bi package. */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the Search component as the default export of this module.
export default Search;
