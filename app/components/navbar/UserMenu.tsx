// Import necessary modules and components.
'use client'
import React from 'react';
import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal'; // Import the custom hook for the register modal.

// Define a functional component named UserMenu.
const UserMenu = () => {
    const registerModal = useRegisterModal(); // Initialize the register modal hook.

    // Initialize a state variable 'isOpen' and a function 'setisOpen' using the 'useState' hook.
    const [isOpen, setisOpen] = useState(false);

    // Create a callback function 'toggleOpen' to toggle the 'isOpen' state.
    const toggleOpen = useCallback(
        () => {
            setisOpen((value) => !value);
        },
        []
    );

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                {/* Create a clickable div for "Staycation your Home" (hidden on medium-sized screens). */}
                <div onClick={() => { }} className='hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Staycation your Home
                </div>

                {/* Create a button with an avatar and a menu icon, clickable to toggle the dropdown. */}
                <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer  hover:shadow-md transition'>
                    <AiOutlineMenu /> {/* Display the menu icon. */}
                    <div className='hidden md:block'>
                        <Avatar /> {/* Display the user's avatar (hidden on medium-sized screens). */}
                    </div>
                </div>
            </div>

            {/* Conditionally render the dropdown menu when 'isOpen' is true. */}
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white  overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col pointer-pointer'>
                        <>
                            {/* Include MenuItem components for "Login" and "SignUp" options. */}
                            <MenuItem onClick={() => { }} label='Login' />
                            <MenuItem onClick={registerModal.onOpen} label='SignUp' /> {/* Trigger the register modal opening. */}
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

// Export the UserMenu component as the default export of this module.
export default UserMenu;
